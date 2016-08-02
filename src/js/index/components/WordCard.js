import React from 'react';

export default class WordCard extends React.Component {
	flip () {
		this.props.flip (this.props.idx);
	}

	constructor (props) {
		super (props);

		this.flip = this.flip.bind (this);
	}

	render () {
    var { primary, secondary, flipped } = this.props;
		return (
			<div className="flip-container">
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
		);
	}
}
