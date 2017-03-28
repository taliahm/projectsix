import React from 'react';
import SweetAlert from 'sweetalert-react';

export default class CreateTodo extends React.Component {
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
		const form = document.getElementById('makeToDo')
		const overlay = document.getElementById('makeToDoOverlay')
		form.classList.add('showFormMakeToDo')
		overlay.classList.add('showOverlay')
	}
	closeToDoMaker(e) {
		e.preventDefault();
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
								</i>
							</a>
						</div>
						<h2>Add Your Own Tasks to Your Cleaning Regime</h2>
						<p>Please be sure to include a frequency.</p>
						<ul className="formList">
							<li className="describe">
								<label htmlFor="userDescription">Describe Your Task:</label>
								<input id="userDescription" type="text" value={this.state.userDescription} onChange={this.updateTask}/>
							</li>
							<li>
								<h6>How frequently do you need to perform this task?</h6>
							</li>
							<div className="frequentContain">
								<li>
									<input onChange={this.updateFrequency} value="3" name="userFrequency" id="threeMonth" className="radioButton" type="radio"/>
									<label htmlFor="threeMonth">Every 3 Months</label>
								</li>
								<li>
									<input onChange={this.updateFrequency} value="6" name="userFrequency" id="sixMonth" className="radioButton" type="radio"/>
									<label htmlFor="sixMonth">Every 6 Months</label>
								</li>
								<li>
									<input onChange={this.updateFrequency} value="12" name="userFrequency" id="twelveMonth" className="radioButton" type="radio"/>
									<label htmlFor="twelveMonth">Every Year!</label>
								</li>
							</div>
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