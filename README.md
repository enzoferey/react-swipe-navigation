# react-swipe-navigation
> A simple navigation system based on panels with swipe interaction for both mobile and PC made with React

#Credits

Used a slightly modified version of [Dmitri Voronianski]'s [react-swipe] which also uses [Swipe.js] itself.

#Demo
**[Check out the demo]** (best fit on mobile)

![gif](https://enzoferey.github.io/react-swipe-navigation/demo-gif.gif)

#Install

```
npm install react-swipe-navigation
```

#Usage
###Example

```js
import React from 'react'
import ReactDOM from 'react-dom';
import ReactSwipeNavigation from 'react-swipe-navigation';

class YourClass extends React.Component {
    render() {
        return (
            <ReactSwipeNavigation menu={ ['Home', 'Blog', 'About', 'Contact'] } >
                <div>Home content</div>
                <div>Blog content</div>
                <div>About content</div>
                <div>Contact content</div>
            </ReactSwipeNavigation>
        );
    }
}

ReactDOM.render(
    <YourClass />, 
    document.getElementById('app')
);
```

###Props
  - `menu: ?Array` - any length, but more than 6 will not fit well on mobile
  - `minX: ?Number` - minimum X axis difference for valid swipe
  - `maxY: ?Number` - maximum Y axis difference for valid swipe
  - `speed: ?Number` - speed of transitions (default of Swipe.js is 300ms)
  
([See defaults])

**MIT Licensed**

[Dmitri Voronianski]: <https://github.com/voronianski>
[react-swipe]: <https://github.com/voronianski/react-swipe>
[Swipe.js]: <https://github.com/thebird/swipe>
[Check out the demo]: <https://enzoferey.github.io/react-swipe-navigation/demo>
[See defaults]: <https://github.com/enzoferey/react-swipe-navigation/blob/master/js/ReactSwipeNavigate.js#L153>


