# react-swipe-navigation
> A simple navigation system based on panels with swipe interaction for both mobile and PC made with React

#Credits

Used [Dmitri Voronianski]'s [react-swipe] with slightly modifiex syntax (which also uses [Swipe.js] itself).

#Demo

![gif](https://enzoferey.github.io/react-swipe-navigation/demo-gif.gif)

**[Check out the demo]** (best fit on mobile)

#Install

```
npm install react swipe-js-iso react-swipe-navigation
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
            <ReactSwipeNavigation menu={ ['Home', 'Blog', 'About', 'Contact'] } ></ReactSwipeNavigation>
        );
    }
}

ReactDOM.render(
    <YourClass />, 
    document.getElementById('app')
);
```

###Props
  - `menu: ?Array` - exactly 4 items
  - `minX: ?Number` - minimum X axis difference for valid swipe
  - `maxY: ?Number` - maximum Y axis difference for valid swipe
  
([See defaults])
  
**NOTE: using default react-swipe props, if you change speed of transition you might want to change css transition value on .active-menu to match the effect**

**MIT Licensed**

[Dmitri Voronianski]: <https://github.com/voronianski>
[react-swipe]: <https://github.com/voronianski/react-swipe>
[Swipe.js]: <https://github.com/thebird/swipe>
[Check out the demo]: <https://enzoferey.github.io/react-swipe-navigation/demo>
[See defaults]: <https://github.com/enzoferey/react-swipe-navigation>


