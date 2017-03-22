import React from 'react';
import ReactDOM from 'react-dom';
import { TodoList } from './data.js';
import Header from './components/header.js';
import CreateTodo from './components/CreateTodo.js';
import InactiveTodos from './components/InactiveTodos.js';
import ActiveTodos from './components/ActiveTodos.js';
import SweetAlert from 'sweetalert-react';
import Footer from './components/Footer.js';


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
		this.deactivateToDo = this.deactivateToDo.bind(this);
		this.reactivateToDo = this.reactivateToDo.bind(this);
		this.userSignsOut = this.userSignsOut.bind(this);
		this.signOut = this.signOut.bind(this);
		this.countdownComplete = this.countdownComplete.bind(this);
		this.showMainContent = this.showMainContent.bind(this);
		this.state = {
				todos: {},
				activeToDos: [],
				completedToDos: [],
				inactiveToDos: [],
				time: false,
				loading: true,
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
	}
	statusUpdate(e) {
		const desc = e.target.name
		const dbRef = firebase.database().ref(`users/${this.state.userUIDApp}/todolist/`)
		dbRef.once('value', (data) => {
			const dataList = data.val()
			for(let garbageKey in dataList) {
				const actualData = dataList[garbageKey]
				const newdbRef = firebase.database().ref(`users/${this.state.userUIDApp}/todolist/${garbageKey}`)
				for(let key in actualData) {
					if(actualData[key].description === desc && actualData[key].status === 'active') {
						actualData[key].status = 'completed'
						const dataKey = key 
						const updates = { }
						updates[`${key}`] = actualData[key]
						newdbRef.update(updates)
					}
					else if (actualData[key].description === desc && actualData[key].status === 'completed') {
						actualData[key].status = 'active'
						const dataKey = key 
						const updates = { }
						updates[`${key}`] = actualData[key]
						newdbRef.update(updates)
					}
				}
			}
		})
	}
	loadTodos() {
		const user = firebase.auth().currentUser
			if(user){
				const dbRef = firebase.database().ref(`users/${user.uid}/todolist`);
				dbRef.push(TodoList);
				const userSignedUpDate = new Date()
				const dateForFirebase = userSignedUpDate.toString();
				const dbRefDateThree = firebase.database().ref(`users/${user.uid}/signUpDateThree`)
				const dbRefDateSix = firebase.database().ref(`users/${user.uid}/signUpDateSix`)
				const dbRefDateTwelve = firebase.database().ref(`users/${user.uid}/signUpDateTwelve`)
				dbRefDateThree.push(dateForFirebase)
				dbRefDateSix.push(dateForFirebase)
				dbRefDateTwelve.push(dateForFirebase)
				dbRef.once('value', (data) => {
					const dbToDoList = data.val();
					for (let key in dbToDoList) {
						const innerToDos = dbToDoList[key];
						this.setState({
							todos: innerToDos
						})
					}
				})
			}
	}
	deactivateToDo(e) {
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
							actualData[key].status = 'inactive'
							const dataKey = key 
							const updates = { }
							updates[`${key}`] = actualData[key]
							newdbRef.update(updates)
						}
						else if (actualData[key].description === desc && actualData[key].status === 'completed') {
							actualData[key].status = 'inactive'
							const dataKey = key 
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
			e.preventDefault();
			const desc = e.target.name
			firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				const dbRef = firebase.database().ref(`users/${user.uid}/todolist/`)
				dbRef.once('value', (data) => {
					const dataList = data.val()
					for(let garbageKey in dataList) {
						const actualData = dataList[garbageKey]
						const newdbRef = firebase.database().ref(`users/${user.uid}/todolist/${garbageKey}`)
						for(let key in actualData) {
							if(actualData[key].description === desc && actualData[key].status === 'inactive') {
								actualData[key].status = 'active'
								const dataKey = key 
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
		firebase.auth().signOut()
		this.userSignsOut()
	}
	showMainContent() {
		//Gets called in Header component
			this.mainContent.classList.add('showMain')
	}
	countdownComplete(months) {
		const dbRefRefreshTodos = firebase.database().ref(`users/${this.state.userUIDApp}/todolist`)
		dbRefRefreshTodos.once('value').then((data) => {
			const refreshData = data.val()
			for (let garbageKey in refreshData){
				const actualRefresh = refreshData[garbageKey]
				const newdbRefRefreshTodos = firebase.database().ref(`users/${this.state.userUIDApp}/todolist/${garbageKey}`)
				for(let key in actualRefresh) {
					if(months === 'Three') {
						const comparison = '3'
						if(actualRefresh[key].status === 'completed' && actualRefresh[key].frequency === '3') {
							actualRefresh[key].status='active'
							const dataRefresh = key
							const updatesRefresh = { }
							updatesRefresh[`${key}`] = actualRefresh[key]
							newdbRefRefreshTodos.update(updatesRefresh)
						}
					}
					else if(months === 'Six') {
						const comparison = '6'
						if(actualRefresh[key].status === 'completed' && actualRefresh[key].frequency === '6') {
							actualRefresh[key].status='active'
							const dataRefresh = key
							const updatesRefresh = { }
							updatesRefresh[`${key}`] = actualRefresh[key]
							newdbRefRefreshTodos.update(updatesRefresh)
						}
					}
					else if(months === 'Twelve') {
						const comparison = '12'
						if(actualRefresh[key].status === 'completed' && actualRefresh[key].frequency === '12') {
							actualRefresh[key].status='active'
							const dataRefresh = key
							const updatesRefresh = { }
							updatesRefresh[`${key}`] = actualRefresh[key]
							newdbRefRefreshTodos.update(updatesRefresh)

						}
					}
				}
			}
		})
	}
	render() {
		return (
			<div>
				<Header setStateonSignUp={() => this.loadTodos()} showMainContent={() => this.showMainContent()}/>
				<main ref={(main) => {this.mainContent = main}}>
					<section className="mainHeader">
						<div className="signOutSection">
							<p>Done Cleaning?</p>
							<div className="holdButtonandMessage">
								<button className="signOutSection__signOutBtn" onClick={this.signOut}>Sign out</button>
								<p className="hiddenAnimation">No but really, did you clean?</p>
							</div>
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



