import React from 'react';
import MonthlyTask from './MonthlyTask.js'
import Clock from './clock.js';


export default (props) => {
	const allData = props.todos;
	let allDone = ''
	if(props.threeMonthStatus === 'empty' && props.sixMonthStatus === 'empty' && props.twelveMonthStatus === 'empty'){
		allDone = (<div className="monthlyList__message--large">
						<p className="monthlyList__messageText--Large">
						<span>You are the cleanest person ever!</span>
						You've cleaned everything you need to! Your living space must be sparkling! Go rest up because it won't be long before the timers reset and you have to clean again!
						</p>
					</div>)
	}
	let nothingDone = ''
	if(props.threeMonthCompletedStatus === 'empty' && props.sixMonthCompletedStatus === 'empty' && props.twelveMonthCompletedStatus === 'empty') {
		console.log('empty')
		nothingDone = (<div className="monthlyListCompleted__message--large">
						<p className="monthlyListCompleted__messageText--large">
						<span>You haven't cleaned anything!</span>
						Take a look at your living space, do you see the dirt? Pick one, just one, of the tasks above and do it! We promise you will feel so much better!
						</p>
					</div>)
	}
	console.log(nothingDone)
	const filteredActiveData = [ ];
	const filteredCompleteData = [ ];
	for(let key in allData) {
		if (allData[key].status === 'active') {
			filteredActiveData.push(allData[key]);
		}
		else if (allData[key].status === 'completed') {
			filteredCompleteData.push(allData[key]);
		}
	}
			return (	<section className="holdActiveandCompleted">
							<section className="outerTaskSection">
							{allDone}
							<h3 className="taskSection__header">Get cleaning! <span>You have a lot to do!</span></h3>
							<div className="activeTasks taskSection">
								<div className="holdClockandTask holdClockandTask--active">
									<div className="holdActiveToDoandHeader">
										<h4 className="monthlyToCleanHeader">Clean these in the <span>next 3 months!</span></h4>
										<MonthlyTask 
											userSignedUpDate={props.userSignedUpDate} 
											clickFunction={(e) => props.clickFunction(e)} 
											removeFunction={(e) => props.removeFunction(e)} 
											data={filteredActiveData} 
											countdown={props.countdown} 
											frequency='3' 
											monthStatus={props.threeMonthStatus}
											statusOfTask='active'/>
									</div>
									<div className="holdClock">
										<h4 className="countdownHeader">Complete these tasks before the time runs out and the dirt wins!</h4>
										<Clock month='90' dbRef='Three' updateFunction={(months) => props.countdownComplete(months)}/>
									</div>
								</div>
								<div className="holdClockandTask holdClockandTask--active">
									<div className="holdActiveToDoandHeader">
										<h4 className="monthlyToCleanHeader">Clean these in the <span>next 6 months!</span></h4>
										<MonthlyTask 
											userSignedUpDate={props.userSignedUpDate} 
											clickFunction={(e) => props.clickFunction(e)} 
											removeFunction={(e) => props.removeFunction(e)} 
											data={filteredActiveData} 
											countdown={props.countdown} 
											frequency='6'
											monthStatus={props.sixMonthStatus} 
											statusOfTask='active'/>
									</div>
									<div className="holdClock">
										<h4 className="countdownHeader">Complete these tasks before the time runs out and the dirt wins!</h4>
										<Clock month='180' dbRef='Six' updateFunction={(months) => props.countdownComplete(months)}/>
									</div>
								</div>
								<div className="holdClockandTask holdClockandTask--active">
									<div className="holdActiveToDoandHeader">
										<h4 className="monthlyToCleanHeader">Clean these in the <span>next year!</span></h4>
										<MonthlyTask 
											userSignedUpDate={props.userSignedUpDate} 
											clickFunction={(e) => props.clickFunction(e)} 
											removeFunction={(e) => props.removeFunction(e)} 
											data={filteredActiveData} 
											countdown={props.countdown}
											frequency='12' 
											monthStatus={props.twelveMonthStatus}
											statusOfTask='active'/>
										</div>
									<div className="holdClock">
										<h4 className="countdownHeader">Complete these tasks before the time runs out and the dirt wins!</h4>
										<Clock month='360' dbRef='Twelve' updateFunction={(months) => props.countdownComplete(months)}/>
									</div>
								</div>
							</div>
						</section>
						<section className="outerTaskSection">
							{nothingDone}
							<h3 className="taskSection__header">You've cleaned these, congrats!</h3>
							<div className="completedTasks taskSection">
								<div className="holdClockandTask">
									<MonthlyTask 
												 userSignedUpDate={props.userSignedUpDate} 
												 clickFunction={(e) => props.clickFunction(e)} 
												 removeFunction={(e) => props.removeFunction(e)} 
												 data={filteredCompleteData} 
												 frequency='3' 
												 monthStatus={props.threeMonthCompletedStatus}
												 statusOfTask='completed'/>
									<div className="holdClock">
										<h5 className="countdownHeader">Good job cleaning these, don't forget you'll have to clean these again in:</h5>
										<Clock month='90' dbRef='Three' updateFunction={(months) => props.countdownComplete(months)}/>
									</div>
								</div>
								<div className="holdClockandTask">
									<MonthlyTask 
												 userSignedUpDate={props.userSignedUpDate} 
												 clickFunction={(e) => props.clickFunction(e)} 
												 removeFunction={(e) => props.removeFunction(e)} 
												 data={filteredCompleteData} 
												 frequency='6' 
												 monthStatus={props.sixMonthCompletedStatus}
												 statusOfTask='completed'/>
									<div className="holdClock">
										<h5 className="countdownHeader">You're killing it! You've cleaned so much! But you will have to clean some stuff again in:</h5>
										<Clock month='180' dbRef='Six' updateFunction={(months) => props.countdownComplete(months)}/>
									</div>
								</div>
								<div className="holdClockandTask">
									<MonthlyTask 
												 userSignedUpDate={props.userSignedUpDate} 
												 clickFunction={(e) => props.clickFunction(e)} 
												 removeFunction={(e) => props.removeFunction(e)} 
												 data={filteredCompleteData} 
												 frequency='12' 
												 monthStatus={props.twelveMonthCompletedStatus}
												 statusOfTask='completed'/>
									<div className="holdClock">
										<h5 className="countdownHeader">Get ready to clean again in:</h5>
										<Clock month='360' dbRef='Twelve' updateFunction={(months) => props.countdownComplete(months)}/>
									</div>
								</div>
							</div>
						</section>
					</section>		
				)
	}



