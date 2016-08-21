import React from 'react';
import ReactDOM from 'react-dom';
import ReactSwipeNavigate from './ReactSwipeNavigate';

require("../css/style.css");

ReactDOM.render(
	<ReactSwipeNavigate>
		<div>Home content</div>
		<div>Blog content</div>
		<div>About content</div>
		<div>Contact content</div>
	</ReactSwipeNavigate>, 
	document.getElementById('app')
);
