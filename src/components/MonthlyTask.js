import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default (props) => {
	const byTimeArray = props.data.filter((item) => {
		return item.frequency === props.frequency
	})
	let items = ' '
	if(props.monthStatus === 'full') {
	items = (
		<ul className="monthlyList">
				<ReactCSSTransitionGroup transitionName="listItemFades" transitionEnterTimeout={5000} transitionLeaveTimeout={5000} component="span">
				
				{byTimeArray.map((item, i ) => {
					let descriptionKey = item.description.replace(" ", "");
					 if(item.status === 'completed') {
						return (
								<li className="monthlyList__listItem monthlyList__listItem--completed" key={descriptionKey}>

									<input name={item.description} checked
										   onChange={(e)=> props.clickFunction(e)} 
										   type="checkbox" 
										   id={`${item.description}`}/>
									<label className="monthlyList__label monthlyList__label--completed" htmlFor={`${item.description}`}>
										<div className="imgContain"><img src="../../assets/checked.png" alt=""/></div>
										<span>{item.description}</span>
									</label>

								</li>
									
							)
						}
					else {
						items= (
									<li className="monthlyList__listItem monthlyList__listItem--active" key={descriptionKey}>
										<input name={item.description}
											   onChange={(e)=> props.clickFunction(e)} 
											   type="checkbox" 
											   id={`${item.description}`}/>
									   
										<label className="monthlyList__label monthlyList__label--active" htmlFor={`${item.description}`}>
											<div className="imgContain"><img src="../../assets/unchecked.png" alt=""/></div>
											<span>{item.description}</span>
										</label>
										<a className="monthlyList__tag" onClick={(e) => props.removeFunction(e)} className={item.description} name={item.description} href="#">Does Not Apply to Me</a>
									</li>
							)
					}
				})}
									
				</ReactCSSTransitionGroup>
									
		</ul>
		)
	}
	else if (props.monthStatus === 'empty' && props.statusOfTask === 'active'){
		return(
				<div>Excellent work, you've completed the tasks in this time bracket, grab a book!</div>
			)
	}
	else if (props.monthStatus === 'empty' && props.statusOfTask === 'completed'){
		return(
				<div>No completed tasks, maybe, start cleaning?</div>
			)
	}
	return (
			<section>
				{items}
			</section>
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