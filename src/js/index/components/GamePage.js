import React from 'react';
import io from 'socket.io-client';

import NavBar from './NavBar';
import CreatePage from './CreatePage';
import JoinPage from './JoinPage';
import MenuPage from './MenuPage';

var socket;

var reset = {
	connection: 0,
	roomID: 'Generating ...',
	group: '',
	message: '',
	word: null,
	done: {},
	score: '',
	flipped: false
};

var getScore = done => {
  var c = 0,w = 0;
  for (var word in done) {
    if (done[word]) {
      c ++;
    } else {
      w ++;
    }
  }
  return 'C: ' + c + ' W: ' + w + ' S: ' + ((2 * c) - w);
};

export default class GamePage extends React.Component {
	componentWillUnmount () {
		socket.emit ('leaveRoom');
		socket.disconnect ();
	}

	onBack () {
		socket.emit ('leaveRoom');
	}

  onPress (roomID, group) {
    socket.emit ('joinRoom', { roomID, group });
  }

	onSend (word) {
		this.setState ({ word });
		socket.emit ('sendWord', word);
	}

	onDone (word, check) {
		var newDone = this.state.done;
		newDone[word] = check;
		this.setState ({ done: newDone });
		socket.emit ('sendScore', getScore (newDone));
	}

	flip () {
		var newWord = this.state.word;
		if (!newWord.flipped) {
			socket.emit ('checkWord', { word: newWord.primary, check: false });
			newWord.flipped = true;
			this.setState ({ word: newWord });
		}
	}

  constructor (props) {
		super (props);

    this.state = reset;

		this.onBack = this.onBack.bind (this);
    this.onPress = this.onPress.bind (this);
    this.onSend = this.onSend.bind (this);
    this.onDone = this.onDone.bind (this);
		this.flip = this.flip.bind (this);

    socket = io ('/game');

    socket.on ('connect', () => socket.emit ('createRoom', this.props.username));

    socket.on ('createRoom', roomID => this.setState ({ roomID }));

    socket.on ('joinRoom', data => {
      var { roomID, group } = data;
			this.setState ({ connection: 2, roomID, group });
		});

    socket.on ('joinGame', group => {
      this.setState ({ connection: 1, group });
      socket.emit ('sendScore', getScore (this.state.done));
      if (this.state.word) {
        socket.emit ('sendWord', this.state.word);
      }
    });

		socket.on ('sendWord', word => this.setState ({ word }));

		socket.on ('sendScore', score => this.setState ({ score }));

		socket.on ('checkWord', data => {
			var { word, check } = data;
			this.onDone (word, check);
		});

		socket.on ('leaveGame', () => {
			this.setState (reset);
			socket.emit ('createRoom', this.props.username)
		});

    socket.on ('message', message => this.setState ({ message }));

    socket.on ('disconnect', () => this.props.onBack ());
  }

	render () {
    var { connection, roomID, group } = this.state;
    var renderPage;
    if (connection === 0) {
      renderPage =
				<CreatePage
					onBack={ this.props.onBack }
					mode={ this.props.mode }
	        username={ this.props.username }
					roomID={ roomID }
					onPress={ this.onPress }
					message={ this.state.message }
				/>;
    } else if (connection === 1) {
			renderPage =
				<MenuPage
					onBack={ this.onBack }
					mode={ "Room: " + roomID + ' (' + group + ')' }
					username={ this.props.username }
	        onSend={ this.onSend }
	        done={ this.state.done }
					onDone={ this.onDone }
	        score={ getScore (this.state.done) }
					vocab={ this.props.vocab }
				/>;
    } else if (connection === 2) {
			renderPage =
				<JoinPage
					onBack={ this.onBack }
					mode={ "Room: " + roomID + ' (' + group + ')' }
					username={ this.props.username }
					word={ this.state.word }
					score={ this.state.score }
					flip={ this.flip }
				/>;
		}

    return (renderPage);
	}
}
