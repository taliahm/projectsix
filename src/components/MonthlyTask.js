import React from 'react';
import Countdown from 'react-count-down';
// import Clock from './clock.js';

export default (props) => {
	const OPTIONS = { endDate: 'September 21 2017', prefix: 'until my birthday!'}
	// const userSignedUp = new Date(props.userSignedUpDate)
	// console.log(userSignedUp)
	// const longerDate = Date('April 2 2017')
	const byTimeArray = props.data.filter((item) => {
		return item.frequency === props.frequency
	});
	return (
		<div className="monthlyList">
				{byTimeArray.map((item, i) => {
					let descriptionKey = item.description.replace(" ", "");
					if(item.status === 'completed') {
					return (
							<li key={descriptionKey}>
								<input name={item.description} checked
									   onChange={(e)=> props.clickFunction(e)} 
									   type="checkbox" 
									   id={`${item.description}`}/>
								<label htmlFor={`${item.description}`}>
									{item.description}
								</label>
							</li>
						)
					}
					else {
						return (
								<li key={descriptionKey}>
									<input name={item.description}
										   onChange={(e)=> props.clickFunction(e)} 
										   type="checkbox" 
										   id={`${item.description}`}/>
									<label htmlFor={`${item.description}`}>
										{item.description}
									</label>
									<a onClick={(e) => props.removeFunction(e)} className={item.description} name={item.description} href="#">Does Not Apply to Me</a>
								</li>
							)
					}
				})}
		</div>
		)
}


//Get time of user log in 
//convert to milliseconds
//add three months in milliseconds
//get elapsed time between these two in milliseconds
//use this number as a constant to set your timer


//user has 90 days to clean house
// today is day 30
//minus 90 - 30 = 60
//timer should show 60


//can't start counting until state of counting to true, because that means everybody has the data