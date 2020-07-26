import React from 'react';
import { GlobalContextProvider } from './global-context';
import { Game } from './game';
import './App.css';

function App() {
	return (
		<div className="App">
			<div style={{ zIndex: 5, position: 'relative' }}>
				<Game />
			</div>
		</div>
	);
}

export default App;
