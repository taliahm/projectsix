import React from 'react';

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
					   		<div className="innerFooter">
					   			<div className="closeForm">
					   				<a onClick={this.hideFooter} href="#"><i className="fa fa-times" aria-hidden="true"></i></a>
					   			</div>
								<p>Created by Talia Harrison-Marcassa at HackerYou.</p>
								<p>This site was created using React Js!</p>
								<p>Thank you to the Noun Project for their icons!</p>
								<p>Thank you to Subtle Patterns for their background pattern.</p>
					   		</div>
					   </div>)
		}
		return (
				<div><a onClick={this.showFooter} href="#" className="footerTag">Credits</a>
					{footer}
				</div>

			)
	}

}