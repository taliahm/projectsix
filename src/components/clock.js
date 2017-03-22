import React from 'react';

export default class Clock extends React.Component {
	constructor() {
		super();
		this.runTheTimer = this.runTheTimer.bind(this)
		this.timerEnds = this.timerEnds.bind(this)
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				const dbRefForDate = firebase.database().ref(`users/${user.uid}/signUpDate${this.props.dbRef}`)
				this.state.userUID = user.uid //this is also not cool, same setState problem
				dbRefForDate.once('value').then((data) => {
					const userSignUpData = data.val()
					for (let key in userSignUpData) {
						const signUpDate = userSignUpData[key]
						this.state.signUpDate = signUpDate //this is not cool should not setState this way
						this.runTheTimer()
					}
				})
			}
			else {
				this.state.userUID = ''  //This is not cool, should not setState this way
				this.state.signUpDate = '' //This is not cool should not setState this way
			}
		})
		this.state = {
				signUpDate: '',
				ticking: '',
				totalTime: '',
				wait: false,
				userUID: ''
		}
	}
	runTheTimer() {
		if(this.state.signUpDate != ''){
			const currentDate = new Date()
			const monthAmount = this.props.month
			const months = monthAmount*24*60*60*1000
			const userSignedUp = this.state.signUpDate
			const userSignUpDate = new Date(userSignedUp)
			const userTime = userSignUpDate.getTime()
			const currentTime = currentDate.getTime()
			const deadline = userTime + months;
			const deadlineDate = new Date(deadline)
			const getTimeRemaining = (deadline) => {
					let total = Date.parse(deadline) - Date.parse(new Date());
					let seconds = Math.floor((total/1000) % 60);
					let minutes = Math.floor((total/1000/60) % 60);
					let hours = Math.floor((total/(1000*60*60)) % 24);
					let days = Math.floor(total/(1000*60*60*24));
					return {
						'days': days,
						'hours': hours,
						'minutes': minutes,
						'seconds': seconds
					}
				}
			this.timerID = setInterval(
   				   () => this.tick(), 1000
    			)
			
			this.tick = () => {
				if(this.state.totalTime.days <= 0 && this.state.totalTime.hours <= 0) {
					clearInterval(this.timerID)
					this.timerEnds()
				}
				this.setState({
					totalTime: getTimeRemaining(deadlineDate)
				})
			}
		}
		else{
			this.setState({
				wait: 'true'
			})
		}
	}
	timerEnds() {
		const dbRefUpdateDate = firebase.database().ref(`users/${this.state.userUID}/signUpDate${this.props.dbRef}`)
		const newDate = new Date();
		const newDateForFirebase = newDate.toString();
		dbRefUpdateDate.remove()
		dbRefUpdateDate.push(newDateForFirebase)
		this.props.updateFunction(`${this.props.dbRef}`)
		this.setState({
			totalTime: '',
			signUpDate: ''
		})
	}
	componentWillUnmount() {
	   clearInterval(this.timerID);
	 }
	render() {
		return(
			<div className="countdown">
				<div className="timeUnitWrap">
					<div className='timeUnit'>{this.state.totalTime.days} <span>days</span></div>
					<div className='timeUnit'>{this.state.totalTime.hours} <span>hours</span></div>
					<div className='timeUnit'> {this.state.totalTime.minutes}<span>minutes</span></div>
				</div>
			</div>
			)
	}
}
