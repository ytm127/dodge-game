import React from 'react';
import { useKeyPress, handleUserInput, checkCollision } from './utils';
import { Player } from './player';
import { Enemy } from './enemy';

export const Game = () => {
	let PLAYER_POS = {
		top: 0,
		left: 0
	};
	let ENEMIES = [
		{ top: 80, left: 80, direction: 'down', speed: 1 },
		{ top: 160, left: 330, direction: 'right', speed: 1 },
		{ top: 400, left: 80, direction: 'up', speed: 1 },
		{ top: 160, left: 0, direction: 'right', speed: 1 }
	];

	const [ playerPosition, setPlayerPosition ] = React.useState(PLAYER_POS);
	const [ enemyPositions, setEnemyPositions ] = React.useState([
		{ top: 80, left: 80, direction: 'down', speed: 1 }
	]);

	const arrowLeft = useKeyPress('ArrowLeft');
	const arrowRight = useKeyPress('ArrowRight');
	const arrowUp = useKeyPress('ArrowUp');
	const arrowDown = useKeyPress('ArrowDown');

	React.useEffect(() => {
		if (enemyPositions) {
			let count = 0;
			const interval = setInterval(() => {
				const updatedPositions = enemyPositions.map((e) => {
					return {
						top: e.direction === 'up' ? (e.top -= 10) : e.direction === 'down' ? (e.top += 10) : e.top,
						left:
							e.direction === 'left' ? (e.left -= 10) : e.direction === 'right' ? (e.left += 10) : e.left,
						direction: e.direction
					};
				});
				// get rid of enemies that have gone out of view
				const updatedPositionsInSight = updatedPositions.filter(
					(e) => e.top >= -40 && e.top <= 440 && e.left >= -40 && e.left <= 440
				);
				// set new positions
				setEnemyPositions(updatedPositionsInSight);
				if (count === 10) {
					let b = enemyPositions;
					b.push({ top: 0, left: 240, direction: 'right' });
					setEnemyPositions(b);
				}
				if (count === 18) {
					let b = enemyPositions;
					b.push({ top: 40, left: 0, direction: 'right' });
					setEnemyPositions(b);
				} else setEnemyPositions(updatedPositionsInSight);
				console.log(count, enemyPositions);
				count += 1;
			}, 200);

			setTimeout(() => {
				clearInterval(interval);
			}, 30000);
		}
	}, []);

	// TODO - MOVE TO UTILS
	// LISTEN FOR USER KEY EVENTS
	React.useEffect(
		() => {
			arrowLeft && handleUserInput('left', playerPosition, setPlayerPosition);
			arrowRight && handleUserInput('right', playerPosition, setPlayerPosition);
			arrowUp && handleUserInput('up', playerPosition, setPlayerPosition);
			arrowDown && handleUserInput('down', playerPosition, setPlayerPosition);
		},
		[ arrowLeft, arrowUp, arrowRight, arrowDown ]
	);

	React.useEffect(
		() => {
			console.log('player moved!');
			// check for collision
			checkCollision(playerPosition, enemyPositions);
		},
		[ playerPosition, enemyPositions ]
	);

	return (
		<div>
			{enemyPositions.map((e, idx) => {
				return <Enemy pos={e} key={idx} />;
			})}
			<Player playerPosition={playerPosition} />
			<div style={{ background: 'lightgrey', height: 400, width: 400, zIndex: 6 }}>
				{/* <Player playerPosition={playerPosition} /> */}
			</div>
		</div>
	);
};
