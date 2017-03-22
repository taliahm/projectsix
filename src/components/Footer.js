import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Footer extends React.Component{
	constructor() {
		super()
		this.showFooter = this.showFooter.bind(this)
		this.hideFooter = this.hideFooter.bind(this)
		this.state = {
			show:false
		}
	}
	showFooter(e) {
		e.preventDefault()
		this.setState({
			show: true
		})
	}
	hideFooter(e) {
		e.preventDefault()
		this.setState({
			show:false
		})
	}
	render() {
		let footer = ' '
		if(this.state.show === true){
			footer = ( <div className="overlayFooter">
							<ReactCSSTransitionGroup transitionName="footerArrives" transitionEnterTimeout={5000} transitionLeaveTimeout={5000} component="span" className="footerAnimate" transitionAppearTimeout={500} transitionAppear={true}>
					   		<div className="innerFooter">
					   			<div className="closeForm closeFormFooter">
					   				<a onClick={this.hideFooter} href="#"><i className="fa fa-times" aria-hidden="true"></i></a>
					   			</div>
					   			<h5 className="footerTitle">How To!</h5>
					   			<p>When you sign up, we will pre-populate your lists with cleaning tasks! The timers will help you prioritize what you should be cleaning in a specific time frame. You can also add your own tasks to your cleaning regime! When time runs out, the tasks in that time frame will auto-populate so you can start your cleaning cycle all over again!</p>
					   			<h5 className="footerTitle">Credits!</h5>
								<p>Created by Talia Harrison-Marcassa at HackerYou.</p>
								<p>This site was created using React Js!</p>
								<p>Thank you to the <a href="https://thenounproject.com/" target="_blank">Noun Project </a>for their icons!</p>
								<p>Thank you to 
									 <a href="https://www.toptal.com/designers/subtlepatterns/" target="_blank"> Subtle Patterns </a>
									for their background pattern.</p>
					   		</div>
					   		</ReactCSSTransitionGroup>
					   </div>)
		}
		return (
				<div><a onClick={this.showFooter} href="#" className="footerTag">Credits & How To Use</a>
				
					{footer}
			
				</div>

			)
	}

}