import React from 'react';

export const Player = ({ playerPosition }) => {
	return <div
		style={{
			width: 40,
			height: 40,
			background: 'grey',
			position: 'absolute',
			top: playerPosition.top,
			left: playerPosition.left
		}}
	/>;
};
