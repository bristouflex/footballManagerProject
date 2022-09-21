import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { store } from './redux';
import { FootballersView } from './views/FootballersView';


function App() {
  return (
		<Provider store={store}>
			<div className="App">
				<FootballersView />
			</div>
		</Provider>
  );
}

export default App;
