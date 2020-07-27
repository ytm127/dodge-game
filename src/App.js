import React from 'react';
import { GlobalContextProvider } from './global-context';
import { Game } from './game';
import './App.css';

function App() {
	return (
		<div className="App" >
			<Game />
		</div>
	);
}

export default App;
