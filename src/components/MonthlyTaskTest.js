import React from 'react';
// import Clock from './clock.js';

export default class MonthlyTaskTest extends React.Component {
	constructor() {
		super()
		this.state = {
			completedToDos: '',
			activeToDos: ''
		}
	}
	componentDidMount() {
		if(this.props.data.length === 0 ){
			console.log('nothing here')
		}
		// const byTimeArray = completedToDos.filter((item) => {
		// 	return item.frequency === this.props.frequency
		// })
		// this.setState({
		// 	activeToDos: byTimeArray
		// })
		// if(byTimeArray.length === 0) {
		// 	console.log('no todos')
		// }
	}
	render() {
		if(this.props.data.length === 0) {
			console.log('nothing here in render')
		}
	return (
		<ul className="monthlyList">
				
		</ul>
		)
	}
}

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