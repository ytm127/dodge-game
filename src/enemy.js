import React from 'react';

export const Enemy = ({pos}) => {
	return (
		<div
			style={{
				width: 40,
				height: 40,
				background: '#eb4034',
				position: 'absolute',
				top: pos && pos.top,
                left: pos && pos.left,
                zIndex: 1,
                transition: 'all 0.1s linear',
                overflow:'hidden',
				display: pos && pos.direction === 'outOfView' ? 'none' : '',
				borderRadius:2
			}}
		/>
	);
};
