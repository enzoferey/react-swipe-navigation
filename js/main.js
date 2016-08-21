import React from 'react';
import ReactDOM from 'react-dom';
import ReactSwipeNavigate from './ReactSwipeNavigate';

require("../css/style.css");

ReactDOM.render(<ReactSwipeNavigate menu={ ['Home', 'Habak', 'Habak2', 'Habak3', 'Habak4', 'Habak5', 'Habak6'] } speed={200} />, document.getElementById('app'))
