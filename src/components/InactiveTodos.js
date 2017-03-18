import React from 'react';

export default (props) => {
	const allData = props.todos;
	const filteredData = [ ];
	for(let key in allData) {
		if (allData[key].status === 'inactive') {
			filteredData.push(allData[key]);
		// console.log(filteredData);
		}
	}
	const displayData = filteredData.map((item, i) => {
			return (
						<li key={item.description.replace(" ", "")}>
							<input type="checkbox" disabled id={item.description} name={item.description}/>
							<label htmlFor={item.description}>{item.description}</label>
							<a href="#" name={item.description} onClick={(e) => props.addToDo(e)}> Oops! Does apply!</a>
						</li>		
				)
			})
	return (
		 <ul> 
		 {displayData}
		</ul>
		)
	}


// {Object.keys(yourObject).map(function(key) {
//     return <div>Key: {key}, Value: {yourObject[key]}</div>;
// })}