import React from 'react';
import { GlobalContextProvider } from './global-context';
import { Game } from './game';
import './App.css';

function App() {

	
	return (
		<div className="App" style={{ overflow: 'hidden' }}>
			<div className="row" style={{ position: 'relative' }}>
				<div className="col" style={{ padding: 0 }}>
					<div
						style={{
							zIndex: 2,
							overflow: 'hidden',
							position: 'absolute',
							background: 'white',
							height: 400,
							width: 400,
							right: 0
						}}
					/>
				</div>
				<div className="col" style={{ padding: 0 }}>
					<Game />
				</div>
				<div className="col" style={{ padding: 0 }}>
					<div
						style={{
							zIndex: 2,
							overflow: 'hidden',
							position: 'absolute',
							background: 'white',
							height: 400,
							width: 500,
							left: -47
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
