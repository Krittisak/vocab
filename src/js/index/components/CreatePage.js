import React from 'react';

import NavBar from './NavBar';

export default class CreatePage extends React.Component {
	onPress (e) {
    e.preventDefault ();

    var roomID = this.refs.roomID.value;
    if (roomID !== '') {
			var group = this.refs.group.value;
			if (group === '') {
				group = '0000';
			}
      this.props.onPress (roomID, group);
    }
  }

  constructor (props) {
		super (props);

    this.onPress = this.onPress.bind (this);
  }

	render () {
    return (
      <div className="hasFlex">
        <NavBar
          isBack={ true }
          onBack={ this.props.onBack }
          title={ this.props.mode }
          username={ this.props.username }
        />
        <div className="gameForm">
					<div className="roomNumber">
	          <div>Room</div>
	          <div>{ this.props.roomID }</div>
					</div>
          <form className="joinForm">
            <div>Enter Room to Join</div>
            <input className="roomID" ref="roomID" type="tel" />
						<div>Group (optional)</div>
            <input className="roomID" ref="group" type="tel" placeholder="Default 0000" />
            <div>{ this.props.message }</div>
            <button className="button" onClick={ this.onPress }>Join Game</button>
          </form>
        </div>
      </div>
    );
	}
}
