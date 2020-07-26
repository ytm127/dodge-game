import React, { useState, useEffect } from 'react';
import { useKeyPress, handleUserInput, checkCollision } from './utils';
import { Player } from './player';
import { Enemy } from './enemy';
import { CSSTransition } from 'react-transition-group';

export const Game = () => {
	let PLAYER_POS = {
		top: 200,
		left: 200
	};

	const [ playerPosition, setPlayerPosition ] = useState(PLAYER_POS);
	const [ enemyPositions, setEnemyPositions ] = useState([]);
	const [ count, setCount ] = useState(0);
	const [ speed, setSpeed ] = useState(10);
	const [ score, setScore ] = useState(0);
	const [ collisionHappened, setCollisionHappned ] = useState(false);
	const [ sessionHighScore, setSessionHighScore ] = useState(0);

	const arrowLeft = useKeyPress('ArrowLeft');
	const arrowRight = useKeyPress('ArrowRight');
	const arrowUp = useKeyPress('ArrowUp');
	const arrowDown = useKeyPress('ArrowDown');

	useEffect(
		() => {
			const init = setTimeout(() => {
				const DIRECTIONS = [ 'up', 'right', 'down', 'left' ];
				const getNewEnemy = (direction) => {
					if (direction === 'up') return { top: 440, left: playerPosition.left, direction: direction };
					if (direction === 'right') return { top: playerPosition.top, left: -40, direction: direction };
					if (direction === 'down') return { top: -40, left: playerPosition.left, direction: direction };
					if (direction === 'left') return { top: playerPosition.top, left: 440, direction: direction };
				};
				const getSecondEnemy = (direction) => {
					if (direction === 'up') return { top: 600, left: playerPosition.left, direction: direction };
					if (direction === 'right') return { top: playerPosition.top, left: -180, direction: direction };
					if (direction === 'down') return { top: -180, left: playerPosition.left, direction: direction };
					if (direction === 'left') return { top: playerPosition.top, left: 600, direction: direction };
				};
				const getThird = (direction) => {
					if (direction === 'up') return { top: 760, left: playerPosition.left, direction: direction };
					if (direction === 'right') return { top: playerPosition.top, left: -299, direction: direction };
					if (direction === 'down') return { top: -299, left: playerPosition.left, direction: direction };
					if (direction === 'left') return { top: playerPosition.top, left: 760, direction: direction };
				};
				let updatedEnemies =
					enemyPositions &&
					enemyPositions.map((e) => {
						if (e.direction === 'outOfView') return {};
						else
							return {
								top:
									e.direction === 'down'
										? e.top + speed
										: e.direction === 'up' ? e.top - speed : e.top,
								left:
									e.direction === 'left'
										? e.left - speed
										: e.direction === 'right' ? e.left + speed : e.left,
								direction:
									e.top > 800 || e.top < -300 || e.left < -300 || e.left + 40 > 800
										? 'outOfView'
										: e.direction
							};
					});
				setCount(count + 1);
				console.log('update game state', count, speed, updatedEnemies);
				// WAVE 1
				if (count <= 100 && speed !== 15) setSpeed(15);
				if (count === 150) setSpeed(20);
				if (count === 200) setSpeed(25);
				if (count === 250) setSpeed(30);
				if (count === 350) setSpeed(35);
				if (count === 400) setSpeed(40);
				if (count % 15 === 0 && count > 20) {
					if (count < 100) {
						const randomDirection = DIRECTIONS[Math.floor(Math.random() * Math.floor(3))];
						let newEnemy = getNewEnemy(randomDirection);
						setEnemyPositions(updatedEnemies.concat(newEnemy));
					} else if (count >= 100 && count < 350) {
						const randomDirection = DIRECTIONS[Math.floor(Math.random() * Math.floor(3))];
						const randomDirection2 = DIRECTIONS[Math.floor(Math.random() * Math.floor(3))];
						let a = getNewEnemy(randomDirection);
						let b = getSecondEnemy(randomDirection2);
						console.log({ updatedEnemies });
						let moreEnemies = updatedEnemies.concat(a).concat(b);
						setEnemyPositions(moreEnemies);
					} else {
						const randomDirection = DIRECTIONS[Math.floor(Math.random() * Math.floor(3))];
						const randomDirection2 = DIRECTIONS[Math.floor(Math.random() * Math.floor(3))];
						const randomDirection3 = DIRECTIONS[Math.floor(Math.random() * Math.floor(3))];
						let a = getNewEnemy(randomDirection);
						let b = getSecondEnemy(randomDirection2);
						let c = getThird(randomDirection3);
						updatedEnemies.length === 15 && updatedEnemies.splice(0, 5);
						let moreEnemies = updatedEnemies.concat(a).concat(b).concat(c);
						setEnemyPositions(moreEnemies);
					}
				} else
					// DEFAULT
					setEnemyPositions(updatedEnemies);
			}, 80);
			if (count === 10000) {
				alert('YOU BEAT THE GAME');
				clearTimeout(init);
			}

			if (collisionHappened) {
				clearTimeout(init);
				// RESET GAME
					setTimeout(() => {
						setCount(0);
				setScore(null);
				setPlayerPosition(PLAYER_POS);
				setEnemyPositions([]);
				setCollisionHappned(false);
					}, 1000);
			}
		},
		[ enemyPositions ]
	);

	useEffect(
		() => {
			!score && setScore(0);
			const scoreTimer = setTimeout(() => {
				setScore(score + 1);
			}, 100);
			if (collisionHappened) {
				clearTimeout(scoreTimer);
				if (sessionHighScore === 0 || score > sessionHighScore) setSessionHighScore(score);
			}
		},
		[ score ]
	);

	useEffect(
		() => {
			!count && setCount(0);
		},
		[ count ]
	);

	// TODO - MOVE TO UTILS
	// LISTEN FOR USER KEY EVENTS
	useEffect(
		() => {
			arrowLeft && handleUserInput('left', playerPosition, setPlayerPosition);
			arrowRight && handleUserInput('right', playerPosition, setPlayerPosition);
			arrowUp && handleUserInput('up', playerPosition, setPlayerPosition);
			arrowDown && handleUserInput('down', playerPosition, setPlayerPosition);
		},
		[ arrowLeft, arrowUp, arrowRight, arrowDown ]
	);

	useEffect(
		() => {
			// check for collision
			checkCollision(playerPosition, enemyPositions, setCollisionHappned);
		},
		[ playerPosition, enemyPositions ]
	);

	return (
		// <CSSTransition>
		<div>
			<div
				style={{
					position: 'relative',
					width: 400,
					background: 'white',
					zIndex: 2,
					margin: 0,
					fontWeight: 'bold',
					fontSize: 40
				}}
			>
				{score}
			</div>
			<Player playerPosition={playerPosition} collisionHappened={collisionHappened} />
			<div
				style={{ background: 'lightgrey', height: 400, width: 400, paddingLeft: 0, border: 'black solid thin' }}
			/>
			{enemyPositions.map((e, idx) => {
				return <Enemy pos={e} key={idx} />;
			})}

			<div
				style={{
					position: 'relative',
					width: 400,
					background: 'white',
					zIndex: 2,
					margin: 0,
					fontSize: 30
				}}
			>
				<div  style={{ transition: 'all 0.1s linear',}}>
				Session Best: {sessionHighScore}
				</div>
			</div>
		</div>
		// </CSSTransition>
	);
};
