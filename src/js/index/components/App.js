import React from 'react';

import LoginPage from './LoginPage';
import MainMenu from './MainMenu';

export default class App extends React.Component {
	onLogin (username, vocab) {
		this.setState ({ username, vocab });
	}

	constructor (props) {
		super (props);

		this.state = { username: null, vocab: null };

		this.onLogin = this.onLogin.bind (this);
	}

	render () {
		var renderPage;
		if (this.state.username === null) {
			renderPage = <LoginPage onLogin={ this.onLogin }/>;
		} else {
			renderPage = <MainMenu username={ this.state.username } vocab={ this.state.vocab } />
		}

		return (renderPage);
	}
}
