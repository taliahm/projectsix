import React from 'react';

export default class Clock extends React.Component {
	constructor() {
		super();
		// this.setUpTimer = this.setUpTimer.bind(this);
		currentDate: new Date()
		// const userSignedUp = this.props.userSignedUpDate
		// userSignUpDate: new Date(this.props.userSignedUpDate)
		threeMonths: 90*24*60*60*1000
		// userTime: this.userSignUpDate.getTime()
	}
	componentDidMount() {
		console.log('MOUNTED MOFO')
		// this.setUpTimer()
		// const userSignedUp = this.props.userSignedUpDate
		// console.log(userSignedUp)
		// const userTime = userSignedUp.getTime()
	}
	render() {
		return(
			<div>This could maybe be a clock, maybe. No promises</div>
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