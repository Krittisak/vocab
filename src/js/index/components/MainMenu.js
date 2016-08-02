import React from 'react';

import ModePage from './ModePage';
import PracticePage from './PracticePage';
import GamePage from './GamePage';

export default class MainMenu extends React.Component {
	onBack () {
		this.setState ({ mode: null });
	}

	onChangeMode (e) {
		this.setState ({ mode: e });
	}

	constructor (props) {
		super (props);

		this.state = { mode: null };

		this.onBack = this.onBack.bind (this);
		this.onChangeMode = this.onChangeMode.bind (this);
	}

	render () {
		var { mode } = this.state;
		var renderPage;
		if (mode === null) {
			renderPage =
				<ModePage
					isBack={ false }
					onBack={ () => {} }
					mode={ 'Vocabulary' }
					username={ this.props.username }
					onChangeMode={ this.onChangeMode }
					list={ ['Practice', 'Game'] }
				/>;
		} else if (mode === 'Practice') {
			renderPage =
				<PracticePage
					onBack={ this.onBack }
					mode={ mode }
					username={ this.props.username }
					vocab={ this.props.vocab }
				/>;
		} else if (mode === 'Game') {
			renderPage =
				<GamePage
					onBack={ this.onBack }
					mode={ mode }
					username={ this.props.username }
					vocab={ this.props.vocab }
				/>;
		}

		return (
			<div className="full scroll">
				{ renderPage }
			</div>
		);
	}
}
