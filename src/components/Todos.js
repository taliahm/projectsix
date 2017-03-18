import React from 'react';
import MonthlyTask from './MonthlyTask.js';

export default (props) => {
	const filteredArray = props.todos.filter((item) => {
		return item.status === props.status;
	})
	if(props.status === 'inactive') {
		return (
				<section>
					<ul>
						{filteredArray.map((item, i) => {
							let descriptionKey = item.description.replace(" ", "");
							return (
								<li key={descriptionKey}>
									<input type="checkbox" disabled id={item.description} name={item.description}/>
									<label htmlFor={item.description}>
										{item.description}
									</label>
									<a href="#" name={item.description} onClick={(e) => props.addToDo(e)}>Oops, does apply!</a>
								</li>
								)
						})}
					</ul>
				</section>
			)
	}
	else { return (
			<section>
				<MonthlyTask clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredArray} frequency='3' countdown={props.countdown}/>
				<MonthlyTask clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredArray} frequency='6' countdown={props.countdown}/>
				<MonthlyTask clickFunction={(e) => props.clickFunction(e)} removeFunction={(e) => props.removeFunction(e)} data={filteredArray} frequency='12' countdown={props.countdown}/>
			</section>
		)
	}
}