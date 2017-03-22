import React from 'react';
import ReactDOM from 'react-dom';
import { TodoList } from './data.js';
import Header from './components/header.js';
import CreateTodo from './components/CreateTodo.js';
import InactiveTodos from './components/InactiveTodos.js';
import ActiveTodos from './components/ActiveTodos.js';
import SweetAlert from 'sweetalert-react';
// import ActiveTodos from './components/ActiveToDoTest.js';
// import MonthlyTask from './components/MonthlyTaskTest.js'
import Footer from './components/Footer.js';
// import Clock from './components/clock.js';

const config = {
   apiKey: "AIzaSyA0uP9IaxMempNtWne_eHswqHZg_l9ZfYY",
   authDomain: "hyproject6.firebaseapp.com",
   databaseURL: "https://hyproject6.firebaseio.com",
   storageBucket: "hyproject6.appspot.com",
   messagingSenderId: "425802413649"
 };
 firebase.initializeApp(config);



class App extends React.Component {
	constructor() {
		super();
		this.statusUpdate = this.statusUpdate.bind(this);
		this.loadTodos = this.loadTodos.bind(this);
		this.showTodos = this.showTodos.bind(this);
		this.deactivateToDo = this.deactivateToDo.bind(this);
		this.reactivateToDo = this.reactivateToDo.bind(this);
		// this.userAddsToDo = this.userAddsToDo.bind(this);
		this.userSignsOut = this.userSignsOut.bind(this);
		this.signOut = this.signOut.bind(this);
		this.countdownComplete = this.countdownComplete.bind(this);
		this.showMainContent = this.showMainContent.bind(this);
		this.state = {
				// signUpDate: "",
				todos: {},
				activeToDos: [],
				completedToDos: [],
				inactiveToDos: [],
				time: false,
				loading: true,
				ticking: '',
				totalTime: '',
				userUIDApp: '',
				threeMonthStatus: '',
				sixMonthStatus: '', 
				twelveMonthStatus: '',
				threeMonthCompletedStatus: '',
				sixMonthCompletedStatus: '',
				twelveMonthCompletedStatus: '',
				inactiveStatus: ''
		}
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
		if(user) {
			const dbRef = firebase.database().ref(`users/${user.uid}/todolist/`)
			dbRef.on('value', (data) => {
				const dbList = data.val()
				for (let garbageKey in dbList) {
					const stateToDoList = dbList[garbageKey]
					const activeToDoList = []
					const completedToDoList = []
					const inactiveToDoList = []
					for(let key in stateToDoList) {
						if(stateToDoList[key].status === 'active') {
							activeToDoList.push(stateToDoList[key])
						}
						else if(stateToDoList[key].status === 'completed') {
							completedToDoList.push(stateToDoList[key])
						}
						else if(stateToDoList[key].status === 'inactive') {
							inactiveToDoList.push(stateToDoList[key])
						}
					}
					//check length of inActive key
					let inactiveStatus = ''
					if(inactiveToDoList.length > 0){
						inactiveStatus = 'full'
					}
					else if(inactiveToDoList.length === 0){
						inactiveStatus = 'empty'
					}
					//creating Arrays of Active to dos by month
					const threeMonthActive = []
					const sixMonthActive = []
					const twelveMonthActive = []
					activeToDoList.map((item) => {
						if(item.frequency === '3'){
							threeMonthActive.push(item)
						}
						else if(item.frequency === '6'){
							sixMonthActive.push(item)
						}
						else if(item.frequency === '12') {
							twelveMonthActive.push(item)
						}
					})
					//setting state for active to dos
					let threeMonthEmpty = ''
					let sixMonthEmpty = ''
					let twelveMonthEmpty = ''
					if(threeMonthActive.length > 0){
						threeMonthEmpty = 'full'
					}
					else if(threeMonthActive.length === 0) {
						threeMonthEmpty = 'empty'
					}
					if(sixMonthActive.length > 0){
						sixMonthEmpty = 'full'
					}
					else if(sixMonthActive.length === 0) {
						sixMonthEmpty = 'empty'
					}
					if(twelveMonthActive.length > 0){
						twelveMonthEmpty = 'full'
					}
					else if(twelveMonthActive.length === 0) {
						twelveMonthEmpty = 'empty'
					}
					//creating Arrays for Completed to dos by month
					const threeMonthCompleted = []
					const sixMonthCompleted = []
					const twelveMonthCompleted = []
					completedToDoList.map((item) => {
						if(item.frequency === '3'){
							threeMonthCompleted.push(item)
						}
						else if(item.frequency === '6'){
							sixMonthCompleted.push(item)
						}
						else if(item.frequency === '12') {
							twelveMonthCompleted.push(item)
						}
					})
					//setting state for completed to dos!
					let threeMonthEmptyCompleted = ''
					let sixMonthEmptyCompleted = ''
					let twelveMonthEmptyCompleted = ''
					if(threeMonthCompleted.length > 0){
						threeMonthEmptyCompleted = 'full'
					}
					else if(threeMonthCompleted.length === 0) {
						threeMonthEmptyCompleted = 'empty'
					}
					if(sixMonthCompleted.length > 0){
						sixMonthEmptyCompleted = 'full'
					}
					else if(sixMonthCompleted.length === 0) {
						sixMonthEmptyCompleted = 'empty'
					}
					if(twelveMonthCompleted.length > 0){
						twelveMonthEmptyCompleted = 'full'
					}
					else if(twelveMonthCompleted.length === 0) {
						twelveMonthEmptyCompleted = 'empty'
					}
				this.setState({
					todos: stateToDoList, 
					userUIDApp: user.uid,
					activeToDos: activeToDoList,
					completedToDos: completedToDoList,
					activeThreeMonthList: threeMonthActive,
					activeSixMonthList: sixMonthActive,
					activeTwelveMonthList: twelveMonthActive,
					completeThreeMonthList: threeMonthCompleted,
					completeSixMonthList: sixMonthCompleted,
					completeTwelveMonthList: twelveMonthCompleted,
					inactiveToDos: inactiveToDoList,
					threeMonthStatus: threeMonthEmpty,
					sixMonthStatus: sixMonthEmpty, 
					twelveMonthStatus: twelveMonthEmpty,
					threeMonthCompletedStatus: threeMonthEmptyCompleted,
					sixMonthCompletedStatus: sixMonthEmptyCompleted,
					twelveMonthCompletedStatus: twelveMonthEmptyCompleted,
					inactiveStatus: inactiveStatus
					})
				}
				this.mainContent.classList.add('showMain')
				// this.setUpTimer()
				})
			}
		})
	}
	userSignsOut() {
		this.setState({
			todos: { },
			signUpDate: ''
		})
		this.mainContent.classList.remove('showMain')
		// this.triggerStateinHeader()
	}
	// triggerStateinHeader() {
	// 	console.log('this should trigget header?')

	statusUpdate(e) {
		//THIS ONE IS DONE
		//changing from 'active' to 'completed' and the reverse
		const desc = e.target.name
		const dbRef = firebase.database().ref(`users/${this.state.userUIDApp}/todolist/`)
		dbRef.once('value', (data) => {
			const dataList = data.val()
			for(let garbageKey in dataList) {
				const actualData = dataList[garbageKey]
				const newdbRef = firebase.database().ref(`users/${this.state.userUIDApp}/todolist/${garbageKey}`)
				for(let key in actualData) {
					if(actualData[key].description === desc && actualData[key].status === 'active') {
						console.log(actualData[key].status)
						actualData[key].status = 'completed'
						const dataKey = key 
						// console.log(key)
						const updates = { }
						updates[`${key}`] = actualData[key]
						newdbRef.update(updates)
					}
					else if (actualData[key].description === desc && actualData[key].status === 'completed') {
						console.log('you already done')
						console.log(actualData[key].status)
						actualData[key].status = 'active'
						const dataKey = key 
						// console.log(key)
						const updates = { }
						updates[`${key}`] = actualData[key]
						newdbRef.update(updates)
					}
				}
			}
			})
		// }
	// })
}
	loadTodos() {
		console.log('we will get todos')
		const user = firebase.auth().currentUser
			if(user){
				const dbRef = firebase.database().ref(`users/${user.uid}/todolist`);
				dbRef.push(TodoList);
				const userSignedUpDate = new Date()
				const dateForFirebase = userSignedUpDate.toString();
				console.log('stringed date', dateForFirebase)
				const dbRefDateThree = firebase.database().ref(`users/${user.uid}/signUpDateThree`)
				const dbRefDateSix = firebase.database().ref(`users/${user.uid}/signUpDateSix`)
				const dbRefDateTwelve = firebase.database().ref(`users/${user.uid}/signUpDateTwelve`)
				dbRefDateThree.push(dateForFirebase)
				dbRefDateSix.push(dateForFirebase)
				dbRefDateTwelve.push(dateForFirebase)
				//retrieve that information from db and display on page, this will need to be actual user route
				dbRef.once('value', (data) => {
					const dbToDoList = data.val();
					// console.log(dbToDoList)
					for (let key in dbToDoList) {
						const innerToDos = dbToDoList[key];
						console.log(dbToDoList[key])
						this.setState({
							todos: innerToDos
						})
					}
				})
			}
	}
	showTodos() {
		console.log('todos showed')

	}
	deactivateToDo(e) {
		//going from active & completed to 'inactive'
		//THIS IS DONE - REFACTOR, has same code as two other functions
		e.preventDefault();
		const desc = e.target.name
		firebase.auth().onAuthStateChanged((user) => {
		if(user) {
			const dbRef = firebase.database().ref(`users/${user.uid}/todolist/`)
			dbRef.once('value', (data) => {
				// console.log(data.val())
				const dataList = data.val()
				for(let garbageKey in dataList) {
					const actualData = dataList[garbageKey]
					const newdbRef = firebase.database().ref(`users/${user.uid}/todolist/${garbageKey}`)
					for(let key in actualData) {
						if(actualData[key].description === desc && actualData[key].status === 'active') {
							console.log('you were active now you deactive')
							actualData[key].status = 'inactive'
							const dataKey = key 
							// console.log(key)
							const updates = { }
							updates[`${key}`] = actualData[key]
							newdbRef.update(updates)
						}
						else if (actualData[key].description === desc && actualData[key].status === 'completed') {
							console.log('you were complete now you inactive')
							console.log(actualData[key].status)
							actualData[key].status = 'inactive'
							const dataKey = key 
							// console.log(key)
							const updates = { }
							updates[`${key}`] = actualData[key]
							newdbRef.update(updates)
						}
					}
				}
			})
		}
	})
	}
	reactivateToDo(e) {
		//This re-activates a todo if you make a boo boo
		//THIS IS DONE - needs refactoring, same code as above!
			e.preventDefault();
			const desc = e.target.name
			firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				const dbRef = firebase.database().ref(`users/${user.uid}/todolist/`)
				dbRef.once('value', (data) => {
					// console.log(data.val())
					const dataList = data.val()
					for(let garbageKey in dataList) {
						const actualData = dataList[garbageKey]
						const newdbRef = firebase.database().ref(`users/${user.uid}/todolist/${garbageKey}`)
						for(let key in actualData) {
							if(actualData[key].description === desc && actualData[key].status === 'inactive') {
								console.log('you were inactive now you active AF')
								actualData[key].status = 'active'
								const dataKey = key 
								// console.log(key)
								const updates = { }
								updates[`${key}`] = actualData[key]
								newdbRef.update(updates)
							}
						}
					}
				})
			}
		})
	}
	signOut(e) {
		e.preventDefault();
		console.log('sign out')
		firebase.auth().signOut()
		// this.setState({
		// 	signedIn: false
		// })
		this.userSignsOut()
	}
	showMainContent() {

			this.mainContent.classList.add('showMain')
	}
	countdownComplete(months) {
		console.log('she DONE in APP!')
		console.log(months)
		const dbRefRefreshTodos = firebase.database().ref(`users/${this.state.userUIDApp}/todolist`)
		dbRefRefreshTodos.once('value').then((data) => {
			const refreshData = data.val()
			for (let garbageKey in refreshData){
				const actualRefresh = refreshData[garbageKey]
				const newdbRefRefreshTodos = firebase.database().ref(`users/${this.state.userUIDApp}/todolist/${garbageKey}`)
				for(let key in actualRefresh) {
					if(months === 'Three') {
						console.log('month is three')
						const comparison = '3'
						console.log('this should be 3', comparison)
						if(actualRefresh[key].status === 'completed' && actualRefresh[key].frequency === '3') {
							console.log(actualRefresh[key])
							console.log('all the three month and completed todos are being updated')
							actualRefresh[key].status='active'
							const dataRefresh = key
							const updatesRefresh = { }
							updatesRefresh[`${key}`] = actualRefresh[key]
							newdbRefRefreshTodos.update(updatesRefresh)
						}
					}
					else if(months === 'Six') {
						console.log('month is six')
						const comparison = '6'
						console.log('comparison should be 6', comparison)
						if(actualRefresh[key].status === 'completed' && actualRefresh[key].frequency === '6') {
							console.log(actualRefresh[key])
							console.log('all the six month todps being updated')
							actualRefresh[key].status='active'
							const dataRefresh = key
							const updatesRefresh = { }
							updatesRefresh[`${key}`] = actualRefresh[key]
							newdbRefRefreshTodos.update(updatesRefresh)
						}
					}
					else if(months === 'Twelve') {
						console.log('month is twelve')
						const comparison = '12'
						console.log('this should be 12', comparison)
						if(actualRefresh[key].status === 'completed' && actualRefresh[key].frequency === '12') {
							console.log('all the twelve month todos being updates')
							console.log(actualRefresh[key])
							actualRefresh[key].status='active'
							const dataRefresh = key
							const updatesRefresh = { }
							updatesRefresh[`${key}`] = actualRefresh[key]
							newdbRefRefreshTodos.update(updatesRefresh)

						}
					}
					// if(actualRefresh[key].status === 'completed') {
					// 	console.log(actualRefresh[key])
					// 	actualRefresh[key].status='active'
					// 	const dataRefresh = key
					// 	const updatesRefresh = { }
					// 	updatesRefresh[`${key}`] = actualRefresh[key]
					// 	newdbRefRefreshTodos.update(updatesRefresh)
					// }
				}
			}
		})
		//get all the todos from firebase
		//update todos that are 'completed' to 'active'
		//push back to firebase 
	}
	render() {
		return (
			<div>
				<Header setStateonSignUp={() => this.loadTodos()} showMainContent={() => this.showMainContent()}/>
				<main ref={(main) => {this.mainContent = main}}>
					<section className="mainHeader">
						<div className="signOutSection">
							<p>Done Cleaning?</p>
							<button className="signOutSection__signOutBtn" onClick={this.signOut}>Sign out</button>
						</div>
						<CreateTodo  userUIDCreate={this.state.userUIDApp}/>
					</section>
					<section className="holdAllTasks">
						<ActiveTodos userSignedUpDate={this.state.signUpDate} 
									 clickFunction={this.statusUpdate} 
									 countdownComplete={this.countdownComplete}
									 addToDo={this.reactivateToDo} 
									 removeFunction={this.deactivateToDo} 
									 todos={this.state.todos}
									 activeToDos={this.state.activeToDos} 
									 status='completed'
									 threeMonthStatus={this.state.threeMonthStatus} 
									 sixMonthStatus={this.state.sixMonthStatus}
									 twelveMonthStatus={this.state.twelveMonthStatus}
									 threeMonthCompletedStatus={this.state.threeMonthCompletedStatus}
									 sixMonthCompletedStatus={this.state.sixMonthCompletedStatus}
									 twelveMonthCompletedStatus={this.state.twelveMonthCompletedStatus}
									/>
						<section className="holdInActive">
							<h2>You've indicated these tasks do not apply to you!</h2>
							<InactiveTodos clickFunction={this.statusUpdate} 
									   addToDo={this.reactivateToDo} 
									   removeFunction={this.deactivateToDo} 
									   todos={this.state.todos} 
									   lengthStatus={this.state.inactiveStatus}/>
						</section>
					</section>
				</main>
				<Footer />
			</div>
			)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

//usually you have one main component, only have render method once!

//counting down
//if status == 'inactive and counter is at 0, will need to change state of all the items


//COUNTING STUFF
// var counting = setInterval(function(){
// 		var addMonths = 3; //or whatever offset
// 		var currentDate = Date();  //returns date as actual date
	
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