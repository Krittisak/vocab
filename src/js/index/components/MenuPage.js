import React from 'react';

import NavBar from './NavBar';
import ListPage from './ListPage';

export default class MenuPage extends React.Component {
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

		currentDir.forEach (data => {
			wordLists = wordLists[data];
		});

		var renderPage;
		if (wordLists instanceof Array) {
			renderPage =
				<ListPage
					wordLists={ wordLists }
					onSend={ this.props.onSend }
          done={ this.props.done }
					onDone={ this.props.onDone }
				/>;
		} else {
			var temp = Object.keys (wordLists);
			var menu = [];
			temp.forEach (data => {
				menu.push (
					<button key={ data } className="button" value={ data } onTouchTap={ this.onPress }>{ data }</button>
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
					username={ this.props.username + ' ' + this.props.score }
				/>
				{ renderPage }
			</div>
		);
	}
}
