import React from 'react';
import ReactDOM from 'react-dom';
import { TodoList } from './data.js';

const config = {
   apiKey: "AIzaSyA0uP9IaxMempNtWne_eHswqHZg_l9ZfYY",
   authDomain: "hyproject6.firebaseapp.com",
   databaseURL: "https://hyproject6.firebaseio.com",
   storageBucket: "hyproject6.appspot.com",
   messagingSenderId: "425802413649"
 };
 firebase.initializeApp(config);

const MonthlyTask = (props) => {
	const runTime = () => {
		console.log('running')
	}
	const byTimeArray = props.data.filter((item) => {
		return item.frequency === props.frequency
	});
	return (
		<div>
			<h6>You should be cleaning this every {props.frequency} months</h6>
				{byTimeArray.map((item, i) => {
					if(item.status === 'completed') {
					return (
							<li key={`${item.frequency}-${i}`}>
								<input name={item.id} checked
									   onChange={(e)=> props.clickFunction(e)} 
									   type="checkbox" 
									   id={`${item.id}`}/>
								<label htmlFor={`${item.id}`}>
									{item.description}
								</label>
							</li>
						)
					}
					else {
						return (
								<li key={`${item.frequency}-${i}`}>
									<input name={item.id}
										   onChange={(e)=> props.clickFunction(e)} 
										   type="checkbox" 
										   id={`${item.id}`}/>
									<label htmlFor={`${item.id}`}>
										{item.description}
									</label>
								</li>
							)
					}
				})}
		</div>
		)
}

const Todos = (props) => {
	const filteredArray = props.todos.filter((item) => {
		return item.status === props.status;
	})
	if(props.status === 'inactive') {
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
				<MonthlyTask clickFunction={(e) => props.clickFunction(e)} data={filteredArray} frequency='3'/>
				<MonthlyTask clickFunction={(e) => props.clickFunction(e)} data={filteredArray} frequency='6'/>
				<MonthlyTask clickFunction={(e) => props.clickFunction(e)} data={filteredArray} frequency='12'/>
			</section>
		)
	}


}

class App extends React.Component {
	constructor() {
		super();
		this.statusUpdate = this.statusUpdate.bind(this);
		this.loadTodos = this.loadTodos.bind(this);
		this.showTodos = this.showTodos.bind(this);
		this.startCountdown = this.startCountdown.bind(this);
		this.state= {
				uid: null,
				todos: [],
				time: false
		}
	}
	statusUpdate(e) {
		console.log(e.target.name)
		const id = e.target.name
		console.log(id);
		const newState = Array.from(this.state.todos);
		console.log(newState);
		const updatedState = newState.map((item, i, array) => {
			if(item.id === e.target.name && item.status === "active") {
				item.status = 'completed'
			}
			else if(item.id === e.target.name && item.status === "completed") {
				item.status = 'active'
			}
			return item
		});
		console.log(updatedState);
		const dbRef = firebase.database().ref('users/eJNXLvaQhDNc383OS5NA0UifcDx2/todolist')
		dbRef.remove();
		dbRef.push(updatedState);
		this.setState({
			todos: updatedState
		})
	}
	loadTodos() {
		//This will happen when user creates profile
		// console.log('clickeeeed');
		//This will need to be a reference to the actual user's route
		const dbRef = firebase.database().ref('users/eJNXLvaQhDNc383OS5NA0UifcDx2/todolist');
		dbRef.push(TodoList);
		//retrieve that information from db and display on page, this will need to be actual user route
		dbRef.on('value', (data) => {
			// console.log(data.val());
			const dbToDoList = data.val();
			//dbToDoList is an object containing an array??????
			for (let key in dbToDoList) {
				const innerToDos = dbToDoList[key];
				// console.log(innerToDos)
				
				this.setState({
					todos: innerToDos
				})
			}
		})
	}
	showTodos() {
		console.log('todos showed')
	}
	startCountdown() {
		console.log('COUNTING')
		this.setState({
			time: true
		})
	}
	render() {
		return (
			<div>
				<h2>Things you should be cleaning:</h2>
				<Todos clickFunction={this.statusUpdate} todos={this.state.todos} status='active'/>
				<h2>Things you've already cleaned:</h2>
				<Todos clickFunction={this.statusUpdate} todos={this.state.todos} status='completed'/>
				<h2>You've indicated these do not apply to you</h2>
				<Todos todos={this.state.todos} status='inactive' />

			{/* This will eventually be sign in section */}
				<button onClick={this.loadTodos}>User Signs Up for first time</button>
				<button onClick={this.showTodos}>User Logs In</button>
				<button onClick={this.startCountdown}>Start timer</button>
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



//when a user logs in, save all the to dos to their piece of the database
//allow user to interact with these to dos