import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin ();

import App from './components/App';

ReactDOM.render (<App />, document.getElementById ('container'));
