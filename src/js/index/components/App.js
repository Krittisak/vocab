import React from 'react';
import cookie from 'react-cookie';

import LoginPage from './LoginPage';
import MainMenu from './MainMenu';

export default class App extends React.Component {
	onLogin (username, vocab) {
    cookie.save ('username', username, { path: '/' });
		this.setState ({ username, vocab });
	}

	onLogout () {
    cookie.remove ('username', { path: '/' });
		this.setState ({ username: undefined });
	}

	constructor (props) {
		super (props);

		this.state = { username: cookie.load ('username'), vocab: null };

		this.onLogin = this.onLogin.bind (this);
		this.onLogout = this.onLogout.bind (this);
	}

	render () {
		var renderPage;
		if (this.state.username === undefined) {
			renderPage = <LoginPage onLogin={ this.onLogin } />;
		} else {
			renderPage = <MainMenu onLogout={ this.onLogout } username={ this.state.username } vocab={ this.state.vocab } />
		}

		return (renderPage);
	}
}
