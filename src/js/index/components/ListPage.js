import React from 'react';

export default class ListPage extends React.Component {
  onPress (p, s, c) {
    this.setState ({ primary: p, secondary: s, check: c });
    if (c) {
      this.props.onDone (p, true);
      this.props.onSend ({ primary: p, secondary: s, flipped: true });
    } else {
      this.props.onSend ({ primary: p, secondary: s, flipped: false });
    }
	}

  constructor (props) {
    super (props);

    this.state = {
      primary: null,
      secondary: null,
      check: false
    };

		this.onPress = this.onPress.bind (this);
  }

  render () {
    var { primary, secondary, check } = this.state;
    var { wordLists, done } = this.props;
    var menu = [];
    wordLists.forEach (word => {
      var active = "buttonList";
      var touch = this.onPress.bind (this, word['p'], word['s'], false);

      if (done[word['p']] !== undefined) {
        active += (done[word['p']] === true) ? " correct" : " wrong";
        touch = () => {};
      } else if (word['p'] === primary) {
        active += " waiting";
        touch = this.onPress.bind (this, word['p'], word['s'], true);
      }

      menu.push (
        <div key={ word['p'] } className={ active } onTouchTap={ touch }>
          <span>{ word['p'] }</span>
          <span className="right">{ word['s'] }</span>
        </div>
      );
    });

    return (
      <div className="listPage">
        { menu }
      </div>
    );
  }
}
