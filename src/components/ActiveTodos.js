import React from 'react';
import MonthlyTask from './MonthlyTask.js';
// import MonthlyTask from './MonthlyTaskTest.js'
import Clock from './clock.js';


export default (props) => {
	const allData = props.todos;
	// console.log(props.userSignedUpDate)
	let allDone = ''
	if(props.threeMonthStatus === 'empty' && props.sixMonthStatus === 'empty' && props.twelveMonthStatus === 'empty'){
		console.log('all done')
		allDone = (<div>You are the cleanest person ever </div>)
	}
	const filteredActiveData = [ ];
	const filteredCompleteData = [ ];
	for(let key in allData) {
		if (allData[key].status === 'active') {
			filteredActiveData.push(allData[key]);
			// console.log(filteredActiveData);
		// console.log(filteredData);
		}
		else if (allData[key].status === 'completed') {
			filteredCompleteData.push(allData[key]);
			// console.log(filteredCompleteData)
		}
	}

			return (	<section className="holdActiveandCompleted">
							<h3 className="taskSection__header">Get cleaning! You have a lot to do!</h3>
							<div className="activeTasks taskSection">
								<div className="holdClockandTask">
								{allDone}
									<MonthlyTask 
										userSignedUpDate={props.userSignedUpDate} 
										clickFunction={(e) => props.clickFunction(e)} 
										removeFunction={(e) => props.removeFunction(e)} 
										data={filteredActiveData} 
										countdown={props.countdown} 
										frequency='3' 
										monthStatus={props.threeMonthStatus}
										statusOfTask='active'/>
									<Clock month='90' dbRef='Three' updateFunction={(months) => props.countdownComplete(months)}/>
								</div>
								<div className="holdClockandTask">
									<Clock month='180' dbRef='Six' updateFunction={(months) => props.countdownComplete(months)}/>
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
								<div className="holdClockandTask">
									<Clock month='360' dbRef='Twelve' updateFunction={(months) => props.countdownComplete(months)}/>
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
							</div>
							<h3 className="taskSection__header">You've cleaned these, congrats!</h3>
							<div className="completedTasks taskSection">
								<div className="holdClockandTask">
									<h6>Good job cleaning these, don't forget you'll have to clean these again in</h6>
									<Clock month='90' dbRef='Three' updateFunction={(months) => props.countdownComplete(months)}/>
									<MonthlyTask 
												 userSignedUpDate={props.userSignedUpDate} 
												 clickFunction={(e) => props.clickFunction(e)} 
												 removeFunction={(e) => props.removeFunction(e)} 
												 data={filteredCompleteData} 
												 frequency='3' 
												 monthStatus={props.threeMonthCompletedStatus}
												 statusOfTask='completed'/>
								</div>
								<div className="holdClockandTask">
									<h5>You're killing it! You've cleaned everything you need to, buuut you will have to clean some stuff again in</h5>
									<Clock month='180' dbRef='Six' updateFunction={(months) => props.countdownComplete(months)}/>
									<MonthlyTask 
												 userSignedUpDate={props.userSignedUpDate} 
												 clickFunction={(e) => props.clickFunction(e)} 
												 removeFunction={(e) => props.removeFunction(e)} 
												 data={filteredCompleteData} 
												 frequency='6' 
												 monthStatus={props.sixMonthCompletedStatus}
												 statusOfTask='completed'/>
								</div>
								<div className="holdClockandTask">
									<h6>Get ready to clean again in</h6>
									<Clock month='360' dbRef='Twelve' updateFunction={(months) => props.countdownComplete(months)}/>
									<MonthlyTask 
												 userSignedUpDate={props.userSignedUpDate} 
												 clickFunction={(e) => props.clickFunction(e)} 
												 removeFunction={(e) => props.removeFunction(e)} 
												 data={filteredCompleteData} 
												 frequency='12' 
												 monthStatus={props.twelveMonthCompletedStatus}
												 statusOfTask='completed'/>
								</div>
							</div>
						</section>		
				)
	}





// {Object.keys(yourObject).map(function(key) {
//     return <div>Key: {key}, Value: {yourObject[key]}</div>;
// })}


// <MonthlyTask clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredArray} frequency='3' countdown={props.countdown}/>
// 						<MonthlyTask clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredArray} frequency='6' countdown={props.countdown}/>
// 						<MonthlyTask clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredArray} frequency='12' countdown={props.countdown}/>

/*{Object.keys(props.todos.filter).map((key) => {
	let descriptionKey = props.todos.filter[key].description.replace(" ", "");
	return (
		<li key={descriptionKey}>
			<input type="checkbox" disabled id={item.description} name={item.description}/>
			<label htmlFor={item.description}>
				{item.description}
			</label>
			<a href="#" name={item.description} onClick={(e) => props.addToDo(e)}>Oops, does apply!</a>
		</li>
		)
})} */