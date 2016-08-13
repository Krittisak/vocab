import React from 'react';
import Slider from 'react-slick';

import WordCard from './WordCard';

export default class WordPage extends React.Component {
  flip (idx) {
    var flipped = this.state.flipped;
    flipped[idx] = !flipped[idx];
    this.setState ({ flipped });
  }

  afterChange () {
    var { wordLists } = this.props;
    var flipped = [];
    wordLists.forEach (data => {
      flipped.push (false);
    });
    this.setState ({ flipped });
    if (this.state.current < wordLists.length) {
      this.setState ({ current: this.state.current + 1 });
    }
  }

  constructor (props) {
    super (props);

    var { wordLists } = this.props;
    var initLength = 2;
    if (initLength > wordLists.length) {
      initLength = wordLists.length;
    }

    var flipped = [];
    wordLists.forEach (data => {
      flipped.push (false);
    });

    this.state = {
      flipped,
      current: initLength
    };

    this.afterChange = this.afterChange.bind (this);
    this.flip = this.flip.bind (this);
  }

  render () {
    var { wordLists } = this.props;
  	var cards = [];
    for (var idx = 0;idx < this.state.current;idx ++) {
      var word = wordLists[idx];
  		cards.push (
        <div key={ idx }>
          <WordCard primary={ word['p'] } secondary={ word['s'] } idx={ idx } flipped={ this.state.flipped[idx] } flip={ this.flip } />
        </div>
      );
  	}

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      afterChange: this.afterChange
    };
    return (
      <Slider {...settings}>
        { cards }
      </Slider>
    );
  }
}
