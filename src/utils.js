import React, { useEffect, useState } from 'react';

export function useKeyPress(targetKey) {
	// State for keeping track of whether key is pressed
	const [ keyPressed, setKeyPressed ] = useState(false);

	// If pressed key is our target key then set to true
	function downHandler({ key }) {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	}

	// If released key is our target key then set to false
	const upHandler = ({ key }) => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};

	// Add event listeners
	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return keyPressed;
}

export const handleUserInput = (direction, current, updatePosition) => {
	if (direction === 'left') updatePosition({ top: current.top, left: current.left - 40 });
	if (direction === 'right') updatePosition({ top: current.top, left: current.left + 40 });
	if (direction === 'up') updatePosition({ top: current.top - 40, left: current.left });
	if (direction === 'down') updatePosition({ top: current.top + 40, left: current.left });
};

export const checkCollision = (playerPos, enemyPos, setCollisionHappened) => {
	enemyPos.forEach((enemy) => {
		if (
			playerPos.left < enemy.left + 40 &&
			playerPos.top < enemy.top + 40 &&
			playerPos.left + 40 > enemy.left &&
			playerPos.top + 40 > enemy.top
		) {
			console.log('collision!')
			setCollisionHappened(true)
		}
	});
};
