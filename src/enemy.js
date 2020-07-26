import React from 'react';

export const Enemy = ({pos}) => {
	return (
		<div
			style={{
				width: 40,
				height: 40,
				background: 'blue',
				position: 'absolute',
				top: pos.top,
                left: pos.left,
                zIndex: 2
			}}
		/>
	);
};
