import React from 'react';

export default (props) => {
	const currentDate = new Date() //current time, will refresh every time
	const userSignUpDate = new Date('2017 01 01') //date when the user logged in, will be pulled from firebase somehow?
	const threeMonths = 90 * 24 * 60 * 60 * 1000 //number of milliseconds in a 3 months
	// console.log(threeMonths)
	const userTime = userSignUpDate.getTime(); //get milliseconds since 1970 of users sign up date
	const timeToEnd = userTime + threeMonths; //get the millisecond value of when they should be done cleaning
	const currentTime = currentDate.getTime(); //get milliseconds since 1970 of current time
	const elapsedTime = timeToEnd - currentTime;
	const daysElapsed = (elapsedTime/1000) /60 /60/24
	// console.log(daysElapsed)
	return (

		<div>Clock {elapsedTime}</div>
		)
}