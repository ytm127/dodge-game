import React, { useState, useEffect, useRef } from 'react';
import { useKeyPress, handleUserInput, checkCollision, getRandomDirection } from './utils';
import { Player } from './player';
import { Enemy } from './enemy';
import { CSSTransition } from 'react-transition-group';
import { createRecord, getAll } from './api';
import { get } from 'lodash';

export const Game = () => {
	let PLAYER_POS = {
		top: 200,
		left: 200
	};

	const userInput = useRef(null);
	const [ playerPosition, setPlayerPosition ] = useState(PLAYER_POS);
	const [ enemyPositions, setEnemyPositions ] = useState([]);
	const [ count, setCount ] = useState(0);
	const [ speed, setSpeed ] = useState(10);
	const [ score, setScore ] = useState(0);
	const [ collisionHappened, setCollisionHappned ] = useState(false);
	const [ sessionHighScore, setSessionHighScore ] = useState(0);
	const [ best, setBest ] = useState(null);

	const arrowLeft = useKeyPress('ArrowLeft');
	const arrowRight = useKeyPress('ArrowRight');
	const arrowUp = useKeyPress('ArrowUp');
	const arrowDown = useKeyPress('ArrowDown');

	const fetchScores = () => {
		getAll().then((res) => {
			const arrOfScores = res.map((data) => {
				return { name: data.data.name, score: data.data.score };
			});
			let bestPerson = { name: null, score: 0 };
			arrOfScores.forEach((s) => {
				if (s.score > bestPerson.score) {
					bestPerson['name'] = s.name;
					bestPerson['score'] = s.score;
				}
			});
			setBest(bestPerson);
		});
	};

	useEffect(() => {
		fetchScores();
	}, []);

	useEffect(
		() => {
			const init = setTimeout(() => {
				const getNewEnemy = (direction, offset = 0) => {
					if (direction === 'up')
						return { top: 440 + offset, left: playerPosition.left, direction: direction };
					if (direction === 'right')
						return { top: playerPosition.top, left: -40 - offset, direction: direction };
					if (direction === 'down')
						return { top: -40 - offset, left: playerPosition.left, direction: direction };
					if (direction === 'left')
						return { top: playerPosition.top, left: 440 + offset, direction: direction };
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
									e.top > 560 || e.top < -160 || e.left < -160 || e.left > 560
										? 'outOfView'
										: e.direction
							};
					});
				setCount(count + 1);

				if (count <= 100 && speed !== 15) setSpeed(15);
				if (count === 150) setSpeed(20);
				if (count === 200) setSpeed(25);
				if (count === 250) setSpeed(30);
				if (count === 350) setSpeed(35);
				if (count === 400) setSpeed(40);

				if (count % 15 === 0 && count > 20) {
					if (count > 100 && count % 30 === 0) {
						let enemyOne = getNewEnemy(getRandomDirection());
						let enemyTwo = getNewEnemy(getRandomDirection(), 119);
						setEnemyPositions(updatedEnemies.concat(enemyOne).concat(enemyTwo));
					} else {
						const randomDirection = getRandomDirection();
						let newEnemy = getNewEnemy(randomDirection);
						setEnemyPositions(updatedEnemies.concat(newEnemy));
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

	const handleClick = () => {
		const val = userInput.current.value;
		createRecord(val, sessionHighScore).then((res) => fetchScores());
	};

	const isDisabled = () => sessionHighScore < get(best, 'score');

	return (
		<div>
			<Player playerPosition={playerPosition} collisionHappened={collisionHappened} />
			<div
				style={{ background: 'lightgrey', height: 400, width: 400, paddingLeft: 0, border: 'black solid thin' }}
			/>
			<div
				style={{
					background: 'white',
					zIndex: 2,
					position: 'absolute',
					left: 400,
					top: 0,
					height: 400,
					width: 300,
					paddingLeft: 0,
					paddingTop: 20
				}}
			>
				Best global score: <div style={{ fontWeight: 'bold' }}>{best && `${best.name} : ${best.score}`}</div>
			</div>
			{enemyPositions.map((e, idx) => {
				return <Enemy pos={e} key={idx} />;
			})}
			<div
				style={{
					position: 'absolute',
					width: 400,
					background: 'white',
					zIndex: 2,
					margin: 0,
					fontSize: 30
				}}
			>
				<div style={{ transition: 'all 0.1s linear', height: 30, color: 'grey', fontSize: 20 }}>{score}</div>
				<div style={{ transition: 'all 0.1s linear', height: 50 }}>Session Best: {sessionHighScore}</div>
				<div style={{ transition: 'all 0.1s linear', height: 150 }}>
					<input type="input" ref={userInput} style={{ marginBottom: 20 }} />
					<button type="button" onClick={handleClick} disabled={isDisabled()}>
						Save score
					</button>
				</div>
			</div>
		</div>
	);
};
