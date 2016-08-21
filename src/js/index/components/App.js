import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';

import LoginPage from './LoginPage';
import MainMenu from './MainMenu';

export default class App extends React.Component {
	onLogin (username, code, vocab) {
    cookie.save ('username', username);
	  cookie.save ('code', code);
		this.setState ({ username, vocab });
	}

	onLogout () {
    cookie.remove ('username');
	  cookie.remove ('vocab');
		this.setState ({ username: null });
	}

	constructor (props) {
		super (props);

		var username = cookie.load ('username');
		if (username !== undefined) {
			var code = cookie.load ('code');
			request
				.get ('/data/' + code + '.json')
				.end ((err, res) => {
					if (err) {
					  cookie.remove ('username');
						cookie.remove ('vocab');
					} else {
						this.onLogin (username, code, res.body);
					}
				});
		}

		this.state = { username: null, vocab: null };

		this.onLogin = this.onLogin.bind (this);
		this.onLogout = this.onLogout.bind (this);
	}

	render () {
		var renderPage;
		if (this.state.username === null) {
			renderPage = <LoginPage onLogin={ this.onLogin } />;
		} else {
			renderPage = <MainMenu onLogout={ this.onLogout } username={ this.state.username } vocab={ this.state.vocab } />
		}

		return (renderPage);
	}
}
