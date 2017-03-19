import React from 'react';

export default class Clock extends React.Component {
	constructor() {
		super();
		this.runTheTimer = this.runTheTimer.bind(this)
		this.timerEnds = this.timerEnds.bind(this)
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				const dbRefForDate = firebase.database().ref(`users/${user.uid}/signUpDate`)
				dbRefForDate.on('value', (data) => {
					const userSignUpData = data.val()
					for(let key in userSignUpData) {
						const signUpDate = userSignUpData[key]
						this.state.signUpDate = signUpDate
						this.runTheTimer()
					}
				})
			}
		})
		this.state = {
				signUpDate: '',
				ticking: '',
				totalTime: '',
				wait: false
		}
	}
	componentDidMount() {
		
	}
	runTheTimer() {
		console.log('MOUNTED MOFO')
		if(this.state.signUpDate != ''){
			const currentDate = new Date()
			const monthAmount = this.props.month
			// console.log(monthAmount)
			const threeMonths = monthAmount*24*60*60*1000
			const userSignedUp = this.state.signUpDate
			const userSignUpDate = new Date(userSignedUp)
			const userTime = userSignUpDate.getTime()
			const currentTime = currentDate.getTime()
			const deadline = userTime + threeMonths;
			const deadlineDate = new Date(deadline)
			const getTimeRemaining = (deadline) => {
					let total = Date.parse(deadline) - Date.parse(new Date());
					let seconds = Math.floor((total/1000) % 60);
					let minutes = Math.floor((total/1000/60) % 60);
					let hours = Math.floor((total/(1000*60*60)) % 24);
					let days = Math.floor(total/(1000*60*60*24));
					return {
						// 'total': total, 
						'days': days,
						// 'days': 0, 
						'hours': hours,
						'minutes': minutes,
						'seconds': seconds
					}
				}
				 this.timerID = setInterval(
   				   () => this.tick(),
      				1000
    			);
			this.tick = () => {
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
		// this.setUpTimer()
		// const userSignedUp = this.props.userSignedUpDate
		// console.log(userSignedUp)
		// const userTime = userSignedUp.getTime()
	}
	timerEnds() {
		console.log('if i done i be here')
		console.log(this.state.totalTime)
		if(this.state.totalTime.days === 0) {
			console.log('timer done')
		}
	}
	componentWillUnmount() {
	   clearInterval(this.timerID);
	 }
	render() {
		return(
			<div>You have {this.state.totalTime.days} days, {this.state.totalTime.hours} hours {this.state.totalTime.minutes} minutes to clean these!</div>
			)
	}
}
// 	const currentDate = new Date() //current time, will refresh every time
// 	// console.log('currentDate', currentDate)
// 	const userSignUpDate = new Date(props.userSignedUpDate) //date when the user logged in, will be pulled from firebase somehow?
// 	// console.log('user signed up', userSignUpDate)
// 	const threeMonths = 90 * 24 * 60 * 60 * 1000 //number of milliseconds in a 3 months
// 	// console.log('three months in miliseconds', threeMonths)
// 	// console.log(threeMonths)
// 	const userTime = userSignUpDate.getTime(); //get milliseconds since 1970 of users sign up date
// 	// console.log('user signed up in miliseconds', userTime)
// 	const currentTime = currentDate.getTime(); //get milliseconds since 1970 of current time
// 	// console.log('the current time in miliseconds', currentTime)
// 	const deadline = userTime + threeMonths;
// 	const deadlineDate = new Date(deadline)
// 	const getTimeRemainging = (deadline) => {
// 		let total = Date.parse(deadline) - Date.parse(new Date());
// 		let seconds = Math.floor((total/1000) % 60);
// 		let minutes = Math.floor((total/1000/60) % 60);
// 		let hours = Math.floor((total/(1000*60*60)) % 24);
// 		let days = Math.floor(total/(1000*60*60*24));
// 		return {
// 			'total': total, 
// 			'days': days,
// 			'hours': hours,
// 			'minutes': minutes,
// 			'seconds': seconds
// 		}
// 	}
// 	// console.log(getTimeRemainging(deadlineDate))
// 	const initClock = (id, endtime) => {
// 		const clock = document.getElementById(id)
// 		// const insideClock = document.getElementById(id).innerHTML
// 		// const timeInterval = setInterval(() =>{
// 		// 	// console.log('interval')
// 		// 	let total = getTimeRemainging(endtime)
// 		// 	clock.dangerouslySetInnerHTML = `<span> ${total.days}</span>
// 		// 					   <span> ${total.hours}</span>
// 		// 					   <span> ${total.minutes}</span>
// 		// 					   <span> ${total.seconds}</span`
// 		// })
// 	}
// 		initClock('clock', deadlineDate)
	
// 	// console.log(clock())




// 	console.log(deadlineDate) //get the millisecond value of when they should be done cleaning
// 	// console.log('user logged in time plus 3 months', entireTime)
// 	const timeThatHasPassed = currentTime - userTime //get time in milliseconds that has already elapsed on timer
// 	// console.log('time that has already elapsed on timer', timeThatHasPassed)
// 	const timeToEnd = deadline - timeThatHasPassed
// 	// console.log('time left on the 3 month timer', timeToEnd)
// 	const date = new Date(timeToEnd)
// 	// console.log('date of the end', date)
// 	const daysElapsed = (timeToEnd/1000) /60 /60/24
// 	// const days = daysElapsed.getDate()
// 	// console.log(daysElapsed)
// 	// console.log(daysElapsed)
// 	return (

// 		<div id="clock"></div>
// 		)
// }