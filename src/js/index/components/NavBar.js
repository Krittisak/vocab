import React from 'react';

export default class NavBar extends React.Component {
	constructor (props) {
		super (props);
	}

	render () {
		return (
			<div className="navBar">
				{ this.props.isBack ? <button className="buttonBack" onTouchTap={ this.props.onBack }>{ '<' } Back</button> : null }
				<span className="title">{ this.props.title }</span>
				{ this.props.isBack ? null : <button className="buttonLogout" onTouchTap={ this.props.onBack }>Logout</button> }
				<span className="username">{ this.props.username }</span>
			</div>
		);
	}
}
