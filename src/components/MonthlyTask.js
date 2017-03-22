import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default (props) => {
	const byTimeArray = props.data.filter((item) => {
		return item.frequency === props.frequency
	})
	const meanMessages = ['Dude, you haven\'t completed anything yet, maybe,', 'Take a good hard look around your living space, maybe, ', 'This space is empty because you haven\'t cleaned anything, maybe,', 'There\'s nothing here because you have not cleaned, maybe,']
	const niceMessages = ['have a bath?', 'read a book?', 'walk the cat?', 'buy a new hat?', 'binge some Netflix?', 'go for a walk?', 'bake some muffins?', 'eat a croissant?', 'wash your hair?']
	const getMessage = (array) => {
		const randoNum = Math.floor(Math.random() * array.length)
		return array[randoNum]
	}
	let messageBit = getMessage(niceMessages)
	let meanMessageBit = getMessage(meanMessages)
	let items = ' '
	let message = ''
	if(props.monthStatus === 'full') {
	items = byTimeArray.map((item, i) => {
			let descriptionKey = item.description.replace(" ", "");
					 if(item.status === 'completed') {
						return (
								<li className="monthlyList__listItem monthlyList__listItem--completed" key={descriptionKey}>
									<ReactCSSTransitionGroup transitionName="listItemFades" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppearTimeout={500} transitionAppear={true} component="span" className="monthList__listItemHolder" >
									<input name={item.description} checked
										   onChange={(e)=> props.clickFunction(e)} 
										   type="checkbox" 
										   id={`${item.description}`}/>
									<label className="monthlyList__label monthlyList__label--completed" htmlFor={`${item.description}`}>
										<div className="imgContain"><img src="../../assets/checked.png" alt=""/></div>
										<span>{item.description}</span>
									</label>
									</ReactCSSTransitionGroup>
								</li>
									
							)
						}
					else if(item.status === 'active') {
						return (
							<li className="monthlyList__listItem monthlyList__listItem--active" key={descriptionKey}>
								<ReactCSSTransitionGroup transitionName="listItemFades" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppearTimeout={5000} transitionAppear={true} component="span" transitionAppear={true}
     								 transitionAppearTimeout={500} className="monthList__listItemHolder" >
										<input name={item.description}
											   onChange={(e)=> props.clickFunction(e)} 
											   type="checkbox" 
											   id={`${item.description}`}/>
									   
										<label className="monthlyList__label monthlyList__label--active" htmlFor={`${item.description}`}>
											<div className="imgContain"><img src="../../assets/unchecked.png" alt=""/></div>
											<span>{item.description}</span>
										</label>
										<a  onClick={(e) => props.removeFunction(e)} className={`${item.description} monthlyList__tag`} name={item.description} href="#">Does Not Apply to Me</a>
										</ReactCSSTransitionGroup>
									</li>
							)
					}
				})
		}
	else if (props.monthStatus === 'empty' && props.statusOfTask === 'active'){
		message = (
				<div className="monthlyList__message"><p className='monthlyList__messageText'>Excellent work! You've cleaned a lot, time to <span>{messageBit}</span></p></div>
			)
	}
	else if (props.monthStatus === 'empty' && props.statusOfTask === 'completed'){
		message = (
				<div className="monthlyList__message"><p className='monthlyList__messageText'>{meanMessageBit}<span>start cleaning?</span></p></div>
			)
	}
	return (
			<section>
					<ul className="monthlyList">
						{items}
					</ul>
				{message}
			</section>
		)
}

// 							}
// 						else {
// 							return (
									
// 								)
// 						}
// 					})}
// 										</ReactCSSTransitionGroup>
// 			</ul>
// 		}
// 	else if (props.monthStatus === 'empty' && props.statusOfTask === 'active'){
// 		return(
// 				<div>Excellent work, you've completed the tasks in this time bracket, grab a book!</div>
// 			)
// 	}
// 	else if (props.monthStatus === 'empty' && props.statusOfTask === 'completed'){
// 		return(
// 				<div>No completed tasks, maybe, start cleaning?</div>
// 			)
// 	}
// 	return (
// 			<section></section>
// 		)
// 	}
// }


// {byTimeArray.map((item, i ) => {
// 	let descriptionKey = item.description.replace(" ", "");
// 	 if(item.status === 'completed') {
// 		return (
// 				<li className="monthlyList__listItem monthlyList__listItem--completed" key={descriptionKey}>
// 					<input name={item.description} checked
// 						   onChange={(e)=> props.clickFunction(e)} 
// 						   type="checkbox" 
// 						   id={`${item.description}`}/>
// 					<label className="monthlyList__label monthlyList__label--completed" htmlFor={`${item.description}`}>
// 						<div className="imgContain"><img src="../../assets/checked.png" alt=""/></div>
// 						<span>{item.description}</span>
// 					</label>
// 				</li>
// 			)
// 		}
// 	else {
// 		return (
// 				<li className="monthlyList__listItem monthlyList__listItem--active" key={descriptionKey}>
// 					<input name={item.description}
// 						   onChange={(e)=> props.clickFunction(e)} 
// 						   type="checkbox" 
// 						   id={`${item.description}`}/>
// 					<label className="monthlyList__label monthlyList__label--active" htmlFor={`${item.description}`}>
// 						<div className="imgContain"><img src="../../assets/unchecked.png" alt=""/></div>
// 						<span>{item.description}</span>
// 					</label>
// 					<a className="monthlyList__tag" onClick={(e) => props.removeFunction(e)} className={item.description} name={item.description} href="#">Does Not Apply to Me</a>
// 				</li>
// 			)
// 	}
// })}