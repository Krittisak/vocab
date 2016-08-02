import React from 'react';

import NavBar from './NavBar';

export default class ModePage extends React.Component {
	onPress (e) {
		this.props.onChangeMode (e.target.value);
	}

	constructor (props) {
		super (props);

		this.onPress = this.onPress.bind (this);
	}

	render () {
		var { list } = this.props;
		var renderPage = [];
		list.forEach (mode => {
			renderPage.push (<button key={ mode } className="button" value={ mode } onTouchTap={ this.onPress }>{ mode }</button>);
		});

		return (
			<div>
				<NavBar
					isBack={ this.props.isBack }
					onBack={ this.props.onBack }
					title={ this.props.mode }
					username={ this.props.username }
				/>
				<div className="listPage">
					<div className="selectPage">
						{ renderPage }
					</div>
				</div>
			</div>
		);
	}
}
