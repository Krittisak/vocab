import React from 'react';
import request from 'superagent';

export default class LoginPage extends React.Component {
	onPress (e) {
		e.preventDefault ();

		var username = this.refs.username.value;
		if (username === '') {
			this.setState ({ message: 'Please Enter Your Name' });
		} else {
			var code = this.refs.code.value;
			if (code === '') {
				code = '0000';
			}

			request
				.get ('/data/' + code + '.json')
				.end ((err, res) => {
					if (err) {
						this.setState ({ message: 'Invalid Code' });
					} else {
						this.props.onLogin (username, code, res.body);
					}
				});
		}
	}

	constructor (props) {
		super (props);

		this.state = { message: '' };

		this.onPress = this.onPress.bind (this);
	}

	render () {
		return (
			<div className="hasFlex">
				<form className="formLogin">
					<label className="label">Name</label>
					<input className="inputLogin" ref="username" type="text" />
					<label className="label">Code (optional)</label>
					<input className="inputLogin" ref="code" type="tel" placeholder="Default 0000" />
					<label className="label">{ this.state.message }</label>
				  <button className="button" onClick={ this.onPress } type="submit">Login</button>
				</form>
				<span id="credit"></span>
			</div>
		);
	}
}
