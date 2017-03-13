import React from 'react';
import ReactDom from 'react-dom'; //only being used to render on the page, do not need in other components
import Searchbar from './searchbar'; //this matches the fake html element you make later
import List from './list';

//components need a render
//create one App class and stick everything else into it
class App extends React.Component {
	render() {
		const name = 'Talia';
		return (
			<div>
				<h1>Hello {name}!</h1>	
				<p>A tag line for my div</p>
				<List />
				<Searchbar />
			</div>
		)
	}
}






ReactDom.render(<App />, document.getElementById('app'));

//usually you have one main component, only have render method once!

