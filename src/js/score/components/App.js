import React from 'react';
import io from 'socket.io-client';

var socket,list = [];

export default class App extends React.Component {
	constructor (props) {
		super (props);

		var pathname = location.pathname.split ('/');
		var group = pathname[pathname.length - 1];
		this.state = { score: [], group };

		socket = io ('/scoreboard');
    socket.on ('connect', () => {
			socket.emit ('getScore', this.state.group);
    });

		socket.on ('getScore', score => {
			this.setState ({ score });
		});
	}

	render () {
		var { score } = this.state;
		var renderList = [];
		score.forEach ((team, idx) => {
			var active = " up";
			if (list.length === 0) {
				active = "";
			}
			list.forEach ((t, id) => {
				if (t['name'] === team['name']) {
					if (t['score'] < team['score']) {
						active = " up";
					} else if (t['score'] > team['score']) {
						active = " down";
					} else {
						active = "";
					}
				}
			});

			renderList.push (
				<div className={ "list" + active } key={ team['name'] }>
					<div className="c1">{ idx+1 }</div>
					<div className="c2">{ team['name'] }</div>
					<div className="c3">{ team['correct'] }</div>
					<div className="c4">{ team['wrong'] }</div>
					<div className="c5">{ team['score'] }</div>
				</div>
			);
		});
		list = score;

		return (
      <div className="scroll">
				<div className="title">Scoreboard</div>
				<div className="head">
					<div className="c1">Rank</div>
					<div className="c2">Name</div>
					<div className="c3">Correct</div>
					<div className="c4">Wrong</div>
					<div className="c5">Score</div>
				</div>
				<div className="container">
					{ renderList }
				</div>
			</div>
    );
	}
}
