import React from 'react';
import './App.css';
import HomePage from './view/home_page'

import { connect } from 'react-redux';



class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className='App'>
				<HomePage />
			</div>
		);
	}
}




export default App;
