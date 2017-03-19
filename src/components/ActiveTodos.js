import React from 'react';
import MonthlyTask from './MonthlyTask.js';

export default (props) => {
	const allData = props.todos;
	// console.log(props.userSignedUpDate)
	const filteredActiveData = [ ];
	const filteredCompleteData = [ ];
	for(let key in allData) {
		if (allData[key].status === 'active') {
			filteredActiveData.push(allData[key]);
		// console.log(filteredData);
		}
		else if (allData[key].status === 'completed') {
			filteredCompleteData.push(allData[key]);
		}
	}
			return (	<section>
							<div>
							<h6>You should be cleaning these right now</h6>
								<ul>
									<MonthlyTask userSignedUpDate={props.userSignedUpDate} clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredActiveData} countdown={props.countdown} frequency='3' />
								</ul>
								<ul>
									<MonthlyTask userSignedUpDate={props.userSignedUpDate} clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredActiveData} countdown={props.countdown} frequency='6' />
								</ul>
								<ul>
									<MonthlyTask userSignedUpDate={props.userSignedUpDate} clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredActiveData} countdown={props.countdown}frequency='12' />
								</ul>
							</div>
							<div>
								<h3>You've cleaned these, congrats!</h3>
								<ul>
									<MonthlyTask userSignedUpDate={props.userSignedUpDate} clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredCompleteData} countdown='upclock' frequency='3' />
								</ul>
								<ul>
									<MonthlyTask userSignedUpDate={props.userSignedUpDate} clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredCompleteData} countdown='upclock' frequency='6' />
								</ul>
								<ul>
									<MonthlyTask userSignedUpDate={props.userSignedUpDate} clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredCompleteData} countdown='upclock' frequency='12' />
								</ul>
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