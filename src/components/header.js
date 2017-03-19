import React from 'react';

export default class Header extends React.Component {
	constructor() {
		super();
		this.state={
			signedIn: false,
			email:" ",
			password:" ",
			confirm:" "
		}
		this.signIn = this.signIn.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signUp = this.signUp.bind(this);
		this.showSignIn = this.showSignIn.bind(this);
		this.showSignUp = this.showSignUp.bind(this);
	}
	signIn(e) {
		e.preventDefault();
		console.log('signing in')
		firebase.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((userData) => {
				console.log(userData)
				this.setState({
					signedIn: true,
					email: '',
					password: '',
					showForm: ''
				})
				document.getElementById('signIn').reset();
				this.props.showMainContent()
			})
	}
	signUp(e) {
		e.preventDefault();
		console.log('sign up')
		if(this.state.password === this.state.confirm) {
			firebase.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then((userData) => {
					console.log(userData)
					this.setState({
						signedIn: true,
						email: "",
						password: "",
						confirm: "",
						showForm: ""
					})
					this.props.setStateonSignUp()
					this.props.showMainContent()
				})
				document.getElementById('signUp').reset();
		}
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	showSignIn(e) {
		e.preventDefault()
		console.log('user wants to sign in yo')
		console.log(this.showSignUp)
		this.setState({
			showForm: 'signIn'
		})
		if(this.state.showForm != 'signUp'){
		this.formSignIn.classList.toggle('show')
		}
	}

	showSignUp(e) {
		e.preventDefault()
		this.setState({
			showForm: 'signUp'
		})
		if(this.state.showForm != 'signIn') {
		this.formSignUp.classList.toggle('show')
		}
	}
	render() {
		return (
				<div>
				<header>
					<h1>Clean It!</h1>
					<h2>Can't remember what you should be cleaning, no problem, we do.</h2>
					<h4>The dirt will win, don't give up the good fight!</h4>
				</header>
				<section className="signIn">
					<button onClick={this.showSignIn}>Have an account? Sign In!</button>
					<button onClick={this.showSignUp}>Need an account? Sign up!</button> 
				</section>
					<form className="signUp" id="signUp" onSubmit={this.signUp} ref={(form) => { this.formSignUp = form }}>
						<label htmlFor="email">Please enter your email:</label>
						<input name="email" onChange={this.handleChange} id="email" type="email"/>
						<label htmlFor="password">Please enter your password:</label>
						<input name="password" onChange={this.handleChange} type="password" id="password"/>
						<label htmlFor="confirmPassword">Please confirm your password:</label>
						<input name="confirm" onChange={this.handleChange} type="password" id="confirmPassword"/>
						<input type="submit" value="Submit" onClick={this.signUp}/>
					</form>
					<form className="signIn" id="signIn" onSubmit={this.signIn} ref={(form) => { this.formSignIn = form }}>
						<label htmlFor="email">Please enter your email:</label>
						<input name="email" onChange={this.handleChange} id="email" type="email"/>
						<label htmlFor="password">Please enter your password:</label>
						<input name="password" onChange={this.handleChange} type="password" id="password"/>
						<input type="submit" value="sign the fuck in" onClick={this.signIn}/>
					</form>
				</div>
			)
	}
}