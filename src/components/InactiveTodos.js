import React from 'react';

export default (props) => {
	const allData = props.todos;
	const filteredData = [ ];
	let statusMessage = ''
	if(props.lengthStatus === 'empty') {
		statusMessage = (<div className="emptyStatusMessage"><p>Tasks that you've indicated don't apply to you will appear here.</p></div>)
	}
	for(let key in allData) {
		if (allData[key].status === 'inactive') {
			filteredData.push(allData[key]);
		}
	}
	const displayData = filteredData.map((item, i) => {
			return (
						<li key={item.description.replace(" ", "")}>
							<input type="checkbox" disabled id={item.description} name={item.description}/>
							<label htmlFor={item.description}>{item.description}</label>
							<a className="monthlyList__tagInactive" href="#" name={item.description} onClick={(e) => props.addToDo(e)}> Oops! Does apply!</a>
						</li>		
				)
			})
	return (
		<div>
			 <ul className="inactiveList"> 
				 {statusMessage}
				 {displayData}
			</ul>
		</div>
		)
	}
