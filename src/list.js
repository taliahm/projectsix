import React from 'react';

export default class List extends React.Component {
	render(){
		return(
			<ul>
				<li>Cat one <img src="http://unsplash.it/200" alt="kitten"/></li>
				<li>Cat Two</li>
				<li>Cat three</li>
			</ul>
			)
	}
}