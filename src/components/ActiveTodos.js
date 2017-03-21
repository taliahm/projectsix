import React from 'react';
import MonthlyTask from './MonthlyTask.js';
// import MonthlyTask from './MonthlyTaskTest.js'
import Clock from './clock.js';


export default (props) => {
	const allData = props.todos;
	// console.log(props.userSignedUpDate)
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
									<MonthlyTask 
										userSignedUpDate={props.userSignedUpDate} 
										clickFunction={(e) => props.clickFunction(e)} 
										removeFunction={(e) => props.removeFunction(e)} 
										data={filteredActiveData} 
										countdown={props.countdown} 
										frequency='3' 
										monthStatus={props.threeMonthStatus}/>
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
										monthStatus={props.sixMonthStatus} />
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
										monthStatus={props.twelveMonthStatus}/>
								</div>
							</div>
							<h3 className="taskSection__header">You've cleaned these, congrats!</h3>
							<div className="completedTasks taskSection">
								<div className="holdClockandTask">
									<MonthlyTask userSignedUpDate={props.userSignedUpDate} clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredCompleteData} countdown='upclock' frequency='3' />
								</div>
								<div className="holdClockandTask">
									<MonthlyTask userSignedUpDate={props.userSignedUpDate} clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredCompleteData} countdown='upclock' frequency='6' />
								</div>
								<div className="holdClockandTask">
									<MonthlyTask userSignedUpDate={props.userSignedUpDate} clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredCompleteData} countdown='upclock' frequency='12' />
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