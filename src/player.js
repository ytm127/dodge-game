import React from 'react';

export const Player = ({ playerPosition, collisionHappened }) => {
	return <div
		style={{
			width: 40,
			height: 40,
			background: collisionHappened ? '#e8eb34' :'grey',
			position: 'absolute',
			top: playerPosition.top,
			left: playerPosition.left,
			transition: 'all 0.1s ease',
			zIndex: 3,
			borderRadius:2
		}}
	/>;
};
