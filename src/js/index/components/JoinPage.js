import React from 'react';

import NavBar from './NavBar';

export default class JoinPage extends React.Component {
	flip () {
		this.props.flip ();
	}

	constructor (props) {
		super (props);

		this.flip = this.flip.bind (this);
	}

	render () {
		var { word, flipped } = this.props;
		var renderPage;
		if (word === null) {
			renderPage = <div className="instruction">Waiting for Word !!!</div>
		} else {
			var { primary, secondary, flipped } = word;
			renderPage =
				<div className="flip-container2">
					<div className={ "flipper" + (flipped ? " flipped" : "") }>
						<div className="front hasFlex" onTouchTap={ this.flip }>
							<div className="word">
								<span className="primary">{ primary }</span>
							</div>
						</div>
						<div className="back hasFlex" onTouchTap={ this.flip }>
							<div className="word">
								<span className="primary">{ primary }</span><hr/>
								<span className="secondary">{ secondary }</span>
							</div>
						</div>
					</div>
				</div>
		}

		return (
			<div className="hasFlex">
				<NavBar
					isBack={ true }
					onBack={ this.props.onBack }
					title={ this.props.mode }
					username={ this.props.username + ' ' + this.props.score }
				/>
				{ renderPage }
			</div>
		);
	}
}
