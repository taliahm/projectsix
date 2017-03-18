import React from 'react';

export default class Header extends React.Component {
	constructor() {
		super();
		this.signIn = this.signIn.bind(this);
	}
	signIn(e) {
		e.preventDefault();
		console.log('signing in')
	}
	signUp(e) {
		e.preventDefault();
		console.log('sign up')
	}
	signOut(e) {
		e.preventDefault();
		console.log('sign out')
	}
	render() {
		return (
				<div>
					<h2>You should be cleaning things</h2>
					<button onClick={this.signIn}>Sign In</button>
					<button onClick={this.signOut}>Sign Out</button>
					<button onClick={this.signUp}>Sign Up</button>
				</div>
			)
	}
}