import React from 'react';
import ReactDOM from 'react-dom';
import { TodoList } from './data.js';
import Header from './components/header.js';
import Todos from './components/Todos.js';

const config = {
   apiKey: "AIzaSyA0uP9IaxMempNtWne_eHswqHZg_l9ZfYY",
   authDomain: "hyproject6.firebaseapp.com",
   databaseURL: "https://hyproject6.firebaseio.com",
   storageBucket: "hyproject6.appspot.com",
   messagingSenderId: "425802413649"
 };
 firebase.initializeApp(config);

class CreateTodo extends React.Component {
	constructor() {
		super();
		this.updateTask = this.updateTask.bind(this);
		this.updateFrequency = this.updateFrequency.bind(this);
		this.addCustomToDo = this.addCustomToDo.bind(this);
		this.state= {
			userDescription: "",
			userFrequency: "",
		}
	}
	updateTask(e) {
		this.setState ({
			userDescription: e.target.value
		})
	}
	updateFrequency(e) {
		this.setState ({
			userFrequency: e.target.value
		})
	}
	addCustomToDo(e) {
		e.preventDefault();
		// console.log('customTODO')
		const customItem = {
			description: this.state.userDescription,
			frequency: this.state.userFrequency, 
			status: 'active'
		}
		// console.log(customItem)
		//need custom list key, HOW
		const dbRef = firebase.database().ref('users/eJNXLvaQhDNc383OS5NA0UifcDx2/todolist')
		dbRef.once('value').then((data) => {
			// console.log(data.val())
			const usersList = data.val();
			// const garbageKey = usersList[garbageKey];
			// console.log(garbageKey);
		for (let garbageKey in usersList) {
				const actualList = usersList[garbageKey];
				// console.log(customItem);
				actualList.push(customItem);
				const newDbRef = firebase.database().ref(`users/eJNXLvaQhDNc383OS5NA0UifcDx2/todolist/${garbageKey}`)
				const ref = newDbRef.push(customItem);
				this.props.resetState();
			}
			// dbRef.remove();
			// dbRef.push(actualList);
		})
		// dbRef.push(customItem);
		this.setState({
			userDescription: "",
			userFrequency: "",
		});
		document.getElementById('makeToDo').reset();
	}
	render() {
		return (
			<div>
				<form id="makeToDo" onSubmit={this.addCustomToDo}>
					<h6>Add Your Own Tasks:</h6>
					<label htmlFor="userDescription">Describe Your Task:</label>
					<input id="userDescription" type="text" value={this.state.userDescription} onChange={this.updateTask}/>
					<h6>How frequenctly do you need to perform these tasks?</h6>
					<label htmlFor="threeMonth">every 3 Months</label>
					<input onChange={this.updateFrequency} value="3" name="userFrequency" id="threeMonth" className="radioButton" type="radio"/>
					<label htmlFor="sixMonth">every 6 Months</label>
					<input onChange={this.updateFrequency} value="6" name="userFrequency" id="sixMonth" className="radioButton" type="radio"/>
					<label htmlFor="twelveMonth">every Year!</label>
					<input onChange={this.updateFrequency} value="12" name="userFrequency" id="twelveMonth" className="radioButton" type="radio"/>
					<input type="submit" value="add To Do!" onClick={this.addCustomToDo}/>
				</form>
			</div>
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
		this.deactivateToDo = this.deactivateToDo.bind(this);
		this.reactivateToDo = this.reactivateToDo.bind(this);
		this.userAddsToDo = this.userAddsToDo.bind(this);
		this.state= {
				uid: null,
				todos: [],
				time: false
		}
	}
	statusUpdate(e) {
		const desc = e.target.name
		const newState = Array.from(this.state.todos);
		const updatedState = newState.map((item, i, array) => {
			if(item.description === e.target.name && item.status === "active") {
				item.status = 'completed'
			}
			else if(item.description === e.target.name && item.status === "completed") {
				item.status = 'active'
			}
			return item
		});
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
		dbRef.once('value', (data) => {
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
	deactivateToDo(e) {
		e.preventDefault();
		console.log('remove me', e.target.name);
		const desc = e.target.name
		const newState = Array.from(this.state.todos);
		const updatedState = newState.map((item, i, array) => {
			if(item.description === e.target.name && item.status === "active") {
				item.status = 'inactive'
			}
			else if(item.description === e.target.name && item.status === "completed") {
				item.status = 'inactive'
			}
			return item
		});
		const dbRef = firebase.database().ref('users/eJNXLvaQhDNc383OS5NA0UifcDx2/todolist')
		dbRef.remove();
		dbRef.push(updatedState);
		this.setState({
			todos: [...updatedState]
		})
	}
	reactivateToDo(e) {
		e.preventDefault();
		console.log('reactivate!')
		const desc = e.target.name
		const newState = Array.from(this.state.todos);
		const updatedState = newState.map((item, i, array) => {
			if(item.description === e.target.name && item.status === "inactive") {
				item.status = 'active'
			}
			else if(item.description === e.target.name && item.status === "completed") {
				item.status = 'active'
			}
			return item
		});
		const dbRef = firebase.database().ref('users/eJNXLvaQhDNc383OS5NA0UifcDx2/todolist')
		dbRef.remove();
		dbRef.push(updatedState);
		this.setState({
			todos: updatedState
		})
	}
	userAddsToDo() {
		const dbRef = firebase.database().ref('users/eJNXLvaQhDNc383OS5NA0UifcDx2/todolist')
			dbRef.on('value', (data) => {
			// console.log(data.val());
			const updatedList = data.val();
			for(let garbagekey in updatedList) {
				let userAddedList = updatedList[garbagekey];
				console.log(userAddedList);
				this.setState({
					todos:userAddedList
				})
			}
		})
	}
	render() {
		return (
			<div>
				<Header />
				<CreateTodo resetState={this.userAddsToDo}/>
				<h2>Things you should be cleaning:</h2>
				<Todos clickFunction={this.statusUpdate} addToDo={this.reactivateToDo} removeFunction={this.deactivateToDo} todos={this.state.todos} status='active' countdown={this.startCountdown}/>
				<h2>Things you've already cleaned:</h2>
				<Todos clickFunction={this.statusUpdate} addToDo={this.reactivateToDo} removeFunction={this.deactivateToDo} todos={this.state.todos} status='completed' countdown={this.startCountdown}/>
				<h2>You've indicated these do not apply to you</h2>
				<Todos clickFunction={this.statusUpdate} addToDo={this.reactivateToDo} removeFunction={this.deactivateToDo} todos={this.state.todos} status='inactive' countdown={this.startCountdown}/>
			{/*<InActiveTodo removeFunction={this.deactivateToDo} todos={this.state.todos} status*/}

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