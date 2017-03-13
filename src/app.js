import React from 'react';
import ReactDom from 'react-dom';


class Searchbar extends React.Component {
	
}



class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello!</h1>	
				<p>A tag line for my div</p>
				<ul>
					<li>A list</li>
					<li>of items!</li>
					<li>And more items!</li>
				</ul>
			</div>
		)
	}
}






ReactDom.render(<App />, document.getElementById('app'));

//usually you have one main component, only have render method once!

