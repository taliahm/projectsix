import React from 'react';
import SweetAlert from 'sweetalert-react';

export default class Header extends React.Component {
	constructor() {
		super();
		this.state={
			signedIn: false,
			email:" ",
			password:" ",
			confirm:" ",
			showForm: ''
		}
		this.signIn = this.signIn.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signUp = this.signUp.bind(this);
		this.showSignIn = this.showSignIn.bind(this);
		this.showSignUp = this.showSignUp.bind(this);
		this.displayUserAction = this.displayUserAction.bind(this);
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				this.setState({
					signedIn: true
				})
				this.userAction.classList.remove('showUserAction')
			}
			else if(user === null) {
				this.setState({
					signedIn:false
				})
				this.userAction.classList.add('showUserAction')
			}
		})
	}
	displayUserAction() {
		if(this.state.signedIn === false) {
			console.log('show me some login options!')
			this.userAction.classList.add('showUserAction')

		}
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
				this.formSignIn.classList.remove('show')
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
				this.formSignUp.classList.remove('show')
		}
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	showSignIn(e) {
		e.preventDefault()
		this.formSignUp.classList.remove('show')
		this.formSignIn.classList.add('show')
		console.log('user wants to sign in yo')
		console.log(this.showSignUp)

	}
	showSignUp(e) {
		e.preventDefault()
		this.formSignIn.classList.remove('show')
		this.formSignUp.classList.add('show')
	}
	render() {

		return (
				<div>
				<header>
					<h1>Clean It!</h1>
					<h2>Can't remember what you should be cleaning, no problem, we do.</h2>
					<h4>The dirt will win, don't give up the good fight!</h4>
				</header>
				<section className="userAction" ref={(section) => {this.userAction = section}}>
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
						<input type="submit" value="Sign In" onClick={this.signIn}/>
					</form>
				</div>
			)
	}
}