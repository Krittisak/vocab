import React from 'react';

import NavBar from './NavBar';
import WordPage from './WordPage';

export default class PracticePage extends React.Component {
	onBack () {
		var { currentDir } = this.state;
		if (currentDir.length > 0) {
			var newCurrentDir = this.state.currentDir;
			newCurrentDir.pop ();
			this.setState ({ currentDir: newCurrentDir });
		} else {
			this.props.onBack ();
		}
	}

	onPress (e) {
		var newCurrentDir = this.state.currentDir;
		newCurrentDir.push (e.target.value);
		this.setState ({ currentDir: newCurrentDir });
	}

	constructor (props) {
		super (props);

		this.state = {
			currentDir: []
		};

		this.onBack = this.onBack.bind (this);
		this.onPress = this.onPress.bind (this);
	}

	render () {
		var { mode, vocab } = this.props;
		var { currentDir } = this.state;
		var wordLists = vocab;
		var wordPage = false;
		currentDir.forEach (data => {
			wordLists = wordLists.find ((obj) => {
				return obj['title'] === data;
			});

			if (wordLists['data'] !== undefined) {
				wordLists = wordLists['data'];
			} else {
				wordLists = wordLists['words'];
				wordPage = true;
			}
		});

		var renderPage;
		if (wordPage) {
			renderPage = <WordPage wordLists={ wordLists } />;
		} else {
			var menu = [];
			wordLists.forEach (data => {
				var title = data['title'];
				menu.push (
					<button key={ title } className="button" value={ title } onTouchTap={ this.onPress }>{ title }</button>
				);
			});
			renderPage = <div className="listPage"><div className="selectPage">{ menu }</div></div>;
		}

		return (
			<div>
				<NavBar
					isBack={ true }
					onBack={ this.onBack }
					title={ currentDir.length > 0 ? currentDir[currentDir.length-1] : mode }
					username={ this.props.username }
				/>
				{ renderPage }
			</div>
		);
	}
}
