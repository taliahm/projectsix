import React from 'react';
import ReactDOM from 'react-dom';
import { TodoList } from './data.js';
import Header from './components/header.js';
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

class CreateTodo extends React.Component {
	constructor() {
		super();
		this.updateTask = this.updateTask.bind(this);
		this.updateFrequency = this.updateFrequency.bind(this);
		this.addCustomToDo = this.addCustomToDo.bind(this);
		this.showToDoCreator = this.showToDoCreator.bind(this);
		this.closeToDoMaker = this.closeToDoMaker.bind(this);
		this.state= {
			userDescription: "",
			userFrequency: "",
			showAlertCreate: false,
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
		if(this.state.userDescription != '' && this.state.userFrequency != ''){
			const customItem = {
				description: this.state.userDescription ,
				frequency: this.state.userFrequency , 
				status: 'active'
			}
			//UPDATE
			const dbRef = firebase.database().ref(`users/${this.props.userUIDCreate}/todolist`)
			dbRef.once('value').then((data) => {
				const usersList = data.val();
				// const keyToList = ' ';
				for (let garbageKey in usersList) {
					const keyToList = garbageKey;
				const dbRefToList = firebase.database().ref(`users/${this.props.userUIDCreate}/todolist/${garbageKey}`)
					dbRefToList.push(customItem);
				}
			})
			this.setState({
					userDescription: "",
					userFrequency: "",
					});
			const formToDo = document.getElementById('makeToDo')
			const overlayToDo = document.getElementById('makeToDoOverlay')
			formToDo.reset();
			formToDo.classList.remove('showFormMakeToDo')
			overlayToDo.classList.remove('showOverlay')
		}
		else {
			this.setState({
				showAlertCreate: true
			})
		}
	}
	showToDoCreator(e) {
		e.preventDefault();
		console.log('clicked it')
		const form = document.getElementById('makeToDo')
		const overlay = document.getElementById('makeToDoOverlay')
		form.classList.add('showFormMakeToDo')
		overlay.classList.add('showOverlay')
	}
	closeToDoMaker(e) {
		e.preventDefault();
		console.log('closed it')
		this.setState({
				userDescription: "",
				userFrequency: "",
				});
		const formToDo = document.getElementById('makeToDo')
		const overlayToDo = document.getElementById('makeToDoOverlay')
		formToDo.reset();
		formToDo.classList.remove('showFormMakeToDo')
		overlayToDo.classList.remove('showOverlay')
	}
	render() {
		return (
			<div className="wrapCreateToDo">
				<div className="holdCreateToDo">
					<p>Want More?</p>
					<button onClick={this.showToDoCreator} className="addToDoBtn">Add Your Own Tasks</button>
				</div>
				<div className="overlay" id="makeToDoOverlay">
					<form id="makeToDo" onSubmit={this.addCustomToDo} className="formMakeToDo">
						<div className="closeForm">
							<a href="#" onClick={this.closeToDoMaker}>
							<i className="fa fa-times" aria-hidden="true">
							</i></a>
						</div>
						<h2>Add Your Own Tasks to Your Cleaning Regime</h2>
						<p>Please be sure to include a frequency.</p>
						<ul className="formList">
						<li>
							<label htmlFor="userDescription">Describe Your Task:</label>
							<input id="userDescription" type="text" value={this.state.userDescription} onChange={this.updateTask}/>
						</li>
						<li>
							<h6>How frequently do you need to perform these tasks?</h6>
						</li>
						<li>
							<input onChange={this.updateFrequency} value="3" name="userFrequency" id="threeMonth" className="radioButton" type="radio"/>
							<label htmlFor="threeMonth">every 3 Months</label>
						</li>
						<li>
							<input onChange={this.updateFrequency} value="6" name="userFrequency" id="sixMonth" className="radioButton" type="radio"/>
							<label htmlFor="sixMonth">every 6 Months</label>
						</li>
						<li>
							<input onChange={this.updateFrequency} value="12" name="userFrequency" id="twelveMonth" className="radioButton" type="radio"/>
							<label htmlFor="twelveMonth">every Year!</label>
						</li>
						<li>
							<input type="submit" value="Add To Do!" onClick={this.addCustomToDo} className="formMakeToDo__submitBtn"/>
						</li>
						</ul>
					</form>
				</div>
				<SweetAlert
				       show={this.state.showAlertCreate}
				       type="info"
				       title="Oops! Please fill out a description and pick a time frame to proceed"
				       confirmButtonColor='#2D3A65'
				       text={this.state.showAlertText}
				       inputValue="Try Again"
				       onConfirm={() => this.setState({ showAlertCreate: false })}
				     />
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
							<h2>You've indicated these do not apply to you</h2>
							<InactiveTodos clickFunction={this.statusUpdate} 
									   addToDo={this.reactivateToDo} 
									   removeFunction={this.deactivateToDo} 
									   todos={this.state.todos} />
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