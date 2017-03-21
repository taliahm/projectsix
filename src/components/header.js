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
			showForm: '',
			showAlert: false,
			showAlertText: ''
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
			.catch((error) => {
				console.log(error.code)
				let alertMessage = ''
				if(error.code === 'auth/invalid-email') {
					alertMessage = 'Please check you have entered the correct email and attempt to sign in again'
					this.setState({
						showAlertText: alertMessage
					})
				}
				else if(error.code === 'auth/user-disabled' || error.code === 'auth/user-not-found') {
					alertMessage = 'Sorry, for some reason we do not have a record of your email, please sign up'
					this.setState({
						showAlertText: alertMessage,
						showForm: 'signUp',
					})
					this.formSignIn.classList.remove('show')
					this.formSignUp.classList.add('show')
				}
				else if(error.code === 'auth/wrong-password') {
						alertMessage = 'Looks like your password is wrong, try again please!'
						this.setState({
							showAlert: true,
							showAlertText: alertMessage, 
							password: '',
							confirm: ''
						})
						let passInput = document.getElementById('signInPassword')
						console.log(passInput)
						passInput.value = ''
				}
				else {
					alertMessage = 'We are so sorry, something went wrong, please try again!'
				}
				this.setState({
						showAlert: true,
						showAlertText: alertMessage
					})
			})
			.then((userData) => {
				if(userData) {
					this.setState({
						signedIn: true,
						email: '',
						password: '',
						showForm: '',
						showAlertText: ''
					})
					document.getElementById('signIn').reset();
					this.props.showMainContent()
					this.formSignIn.classList.remove('show')
				}
			})
		}
	
	signUp(e) {
		e.preventDefault();
		console.log('sign up')
		if(this.state.password === this.state.confirm) {
			firebase.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.catch((error) => {
					console.log('error error error')
					console.log(error.code)
					let alertMessage = ''
					if(error.code === 'auth/email-already-in-use') {
						alertMessage = 'Looks like you already have an account! Sign in to get cleaning!'
						this.setState({
								showForm: 'signUp',
								showAlertText: alertMessage
							})
						this.formSignUp.classList.remove('show')
						this.formSignIn.classList.add('show')
					}
					else if (error.code === 'auth/invalid-email') {
						alertMessage = 'You\'ve entered an invalid email, please try again'
					}
					else if(error.code === 'auth/weak-password') {
						alertMessage = 'You\'re password is not strong enough, please try again'
						this.setState({
							showAlertText: alertMessage, 
							password: '',
							confirm: ''
						})
						let passInput = document.getElementById('password')
						let confirmInput = document.getElementById('confirmPassword')
						console.log(passInput)
						passInput.value = ''
						confirmInput.value = ''
					}
					else {
						alertMessage = 'We are so sorry, something went wrong, please try again!'
					}
					this.setState({
						showAlert: true,
						showAlertText: alertMessage
					})
				})
				.then((userData) => {
					if(userData) {
						this.setState({
							signedIn: true,
							email: "",
							password: "",
							confirm: "",
							showForm: "",
							showAlertText: ""
						})
						this.props.setStateonSignUp()
						this.props.showMainContent()
					document.getElementById('signUp').reset();
					this.formSignUp.classList.remove('show')
					}
				})
		}
		else { let alertMessage = 'You\'re passwords did not match, please try again'
						this.setState({
							showAlert: true,
							showAlertText: alertMessage, 
							password: '',
							confirm: ''
						})
						let passInput = document.getElementById('password')
						let confirmInput = document.getElementById('confirmPassword')
						console.log(passInput)
						passInput.value = ''
						confirmInput.value = ''
			console.log('yo password do not match, check yo speeling')}
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
					<h1>You should be cleaning!</h1>
					<h2>Can't remember what you should be cleaning? No problem, we do.</h2>
					<h4>The dirt will win, don't give up the good fight!</h4>
				</header>
				<section className="userAction" ref={(section) => {this.userAction = section}}>
					<button className="btn btn--showSignIn" onClick={this.showSignIn}>Have an account? Sign In!</button>
					<button className="btn btn--showSignup" onClick={this.showSignUp}>Need an account? Sign up!</button> 
				</section>
					<form className="signUp userAuth" id="signUp" onSubmit={this.signUp} ref={(form) => { this.formSignUp = form }}>
						<div className="formWrap">
							<h3 className="userAuth__title">Enter your email and choose a password<span> to sign up!</span></h3>
							<label htmlFor="email">Please enter your email:</label>
							<input className="formWrap__textInput" name="email" onChange={this.handleChange} id="email" type="email"/>
							<label htmlFor="password">Please enter a password:</label>
							<input className="formWrap__textInput" name="password" onChange={this.handleChange} type="password" id="password"/>
							<label htmlFor="confirmPassword">Please confirm your password choice:</label>
							<input className="formWrap__textInput" name="confirm" onChange={this.handleChange} type="password" id="confirmPassword"/>
							<p className="userAuth__instructions">One click away from cleaning bliss!<span> Click submit to complete the sign up process</span></p>
							<input className="userAuth__submitBtn" type="submit" value="Submit" onClick={this.signUp} />
							<SweetAlert
							       show={this.state.showAlert}
							       type="error"
							       title="Oops! Something isn't quite right."
							       confirmButtonColor='#2D3A65'
							       text={this.state.showAlertText}
							       inputValue="Try Again"
							       onConfirm={() => this.setState({ showAlert: false })}
							     />
						</div>
					</form>
					<form className="signIn userAuth" id="signIn" onSubmit={this.signIn} ref={(form) => { this.formSignIn = form }}>
						<div className="formWrap">
							<h3 className="userAuth__title userAuth__title--big">Welcome back! <span>You know the drill:</span></h3>
							<label htmlFor="email">Enter your email:</label>
							<input className="formWrap__textInput" name="email" onChange={this.handleChange} id="email" type="email"/>
							<label htmlFor="password">Enter your password:</label>
							<input className="formWrap__textInput" name="password" onChange={this.handleChange} type="password" id="signInPassword"/>
							<p className="userAuth__instructions">Planning to clean today? Do it!</p>
							<input className="userAuth__submitBtn" type="submit" value="Sign In" onClick={this.signIn}/>
						</div>
					</form>
				</div>
			)
	}
}