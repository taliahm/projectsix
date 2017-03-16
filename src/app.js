import React from 'react';
import ReactDOM from 'react-dom';
import Tasks from './data.js';

const MonthlyTask = (props) => {
	const byTimeArray = props.data.filter((item) => {
		return item.frequency === props.frequency
	});
	// console.log(byTimeArray);
	return (
		<div>
			<h6>You should be cleaning this every {props.frequency} months</h6>
				{byTimeArray.map((item, i) => {
					return (
							<li key={`${item.frequency}-${i}`}>
								<input name='cheese'
									   onChange={ (e)=>{props.clickFunction(e)} } 
									   type="checkbox" 
									   id={`${item.id}`}/>
								<label htmlFor={`${item.id}`}>
									{item.description}
								</label>
							</li>
						)
				})}
		</div>
		)
}

const Todos = (props) => {
	const filteredArray = props.todos.filter((item) => {
		return item.status === props.status;
	})
	if(props.status === 'inactive') {
		console.log('INACTIVE SECTION')
		return (
				<section>
					<ul>
						{filteredArray.map((item, i) => {
							return (
								<li key={`${item.frequency}-${i}`}>
									<input type="checkbox" disabled id={`${item.status}${item.frequency}-${i}`} />
									<label htmlFor={`${item.status}${item.frequency}-${i}`}>
										{item.description}
									</label>
								</li>
								)
						})}
					</ul>
				</section>
			)
	}
	else { return (
			<section>
				<MonthlyTask clickFunction={(name)=>{props.clickFunction(name)}} data={filteredArray} frequency='3'/>
				<MonthlyTask clickFunction={(name)=>{props.clickFunction(name)}} data={filteredArray} frequency='6'/>
				<MonthlyTask clickFunction={(name)=>{props.clickFunction(name)}} data={filteredArray} frequency='12'/>
			</section>
		)
	}
}

const InActive = (props) => {

}

class App extends React.Component {
	constructor() {
		super();
		this.statusUpdate = this.statusUpdate.bind(this);
		this.updateState = this.updateState.bind(this);
		this.state= {
				todos: [
						{
							description: 'Clean House' ,
							status: 'inactive',
							frequency: '3',
							id: 10
						},{
							description: 'Clean Microwave' ,
							status: 'inactive',
							frequency: '6',
							id: 11
						},{
							description: 'Clean pillows',
							status: 'completed',
							frequency: '12',
							id: 12
						},{
							description: 'Gutters' ,
							status: 'active',
							frequency: '6',
							id: '13'
						},{
							description: 'Sweep kitchen' ,
							status: 'active',
							frequency: '12',
							id: 14
						}
				]
		}
	}
	statusUpdate(name) {
		const newState = Array.from(this.state.todos);
		const updatedState = newState.map((item, i, array) => {
			if(item.id === name.target.id && item.status === "active") {
				item.status = 'complete'
			}
			return item
		});
		this.updateState(updatedState);
		//now I have an array that is equal to one object
		console.log(updatedState)
	}
	updateState (array) {
		this.setState ({
			todos: array
		})
	}
	render() {
		return (
			<div>
				<h2>Things you should be cleaning:</h2>
				<Todos clickFunction={(name) => {this.statusUpdate(name)}} todos={this.state.todos} status='active'/>
				<h2>Things you've already cleaned:</h2>
				<Todos clickFunction={(name) => {this.statusUpdate(name)}} todos={this.state.todos} status='completed'/>
				<h2>You've indicated these do not apply to you</h2>
				<Todos todos={this.state.todos} status='inactive' />
			</div>
			)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

//usually you have one main component, only have render method once!




//COUNTING STUFF
// var counting = setInterval(function(){
// 	var addMonths = 3; //or whatever offset
// 	var currentDate = new Date();  //returns date as actual date
	
// 	var futureDate = currentDate.setMonth(currentDate.getMonth() + addMonths); //returns date as numerical value
// 	// console.log(currentDate);

// 	var futureDateAsWords = new Date(futureDate) //returns future date as an actual date
// 	// console.log(futureDateAsWords);

// 	var futureTime = futureDateAsWords.getTime();
// 	var currentTime = new Date().getTime();
// 	// console.log(futureTime, currentTime);
// 	// var countDownDate = n.getTime();
// 	// console.log(countDownDate);
// 	var distance = futureTime - currentTime;
// 	// // console.log(distance);
// 	var days = Math.floor(distance / (1000 * 60 * 60*24));

// 	// var hours = Math.floor((distance % (1000 * 60 * 60 )))
// 	console.log(days);
// })
