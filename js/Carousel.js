import React from 'react'
import ReactDOM from 'react-dom';
import ReactSwipe from './ReactSwipe';

class Carousel extends React.Component {

    constructor() {
        super(); // give context for this
        this.state = { position: 0, startX: 0, startY: 0, endX: 0, endY: 0};
        this.static = { minX: 0, maxY: 50 };
        this.menu = [ 'Home', 'Blog', 'About', 'Contact' ];
    }

    init(node) {
        node.addEventListener('touchstart', this.handleStart.bind(this), false);
        node.addEventListener('touchmove', this.handleMove.bind(this), false);
        node.addEventListener('touchend', this.handleEnd.bind(this), false);
    }

    kill(node) {
        node.removeEventListener('touchstart', this.handleStart);
        node.removeEventListener('touchmove', this.handleMove);
        node.removeEventListener('touchend', this.handleEnd);
    }

    handleStart(e) {  
        // assuming single touch, e.touches is an Array of all touches,
        // but with single touch there is only one element
        let touch = e.touches[0];
        this.setState( { startX: touch.screenX, startY: touch.screenY } );
    }

    handleMove(e) {  
        let touch = e.touches[0];
        this.setState( { endX: touch.screenX, endY: touch.screenY } );
    }

    handleEnd() {  
        let xDelta = this.state.startX - this.state.endX;
        // check to see if the delta of X is great enough to trigger a swipe gesture
        // also see if the Y delta wasn’t too drastic to be considered horizontal
        if (Math.abs(xDelta) > this.static.minX && Math.abs(this.state.startY - this.state.endY) < this.static.maxY) {
          // acceptable swipe, now if it delta is negative, it’s a left swipe, otherwise right
          this.updatePosition();
        }
    }

    myClick(panel) {
        this.refs.habak.slide(panel);
        this.updatePosition();
    }

    updatePosition() {
        this.setState( { position: this.refs.habak.getPos() } )
    }

    render() {
        var panels = this.menu.map(function(panel) {
              return (
                  <div key={panel}>
                      {panel}
                  </div>
              );
        }, this); // pass this to access state inside callback function

        return (
            <div ref="swipeZone" style={{ height: '100%' }}>
                <Menu swipe={this.myClick} father={this} list={this.menu} position={this.state.position} />       
                
                <ReactSwipe ref='habak' className="carousel" swipeOptions={{continuous: false}}>
                    {panels}
                </ReactSwipe>
            </div>
        );
    }

    componentDidMount(){
        this.init(ReactDOM.findDOMNode(this.refs.swipeZone));
    }

    componentWillUnmount(){
        this.kill(ReactDOM.findDOMNode(this.refs.swipeZone));
    }
}

class Menu extends React.Component {

    render(){
        var myClass = 'active-menu position' + this.props.position;

        var menuItems = this.props.list.map(function(item, i) {
            return (
                <a key={item} onClick={ this.props.swipe.bind(this.props.father, i) } className="menu-item">{item}</a>
            );
        }, this);

        return (
            <div id="menu">
                <div className={myClass} key="active-menu"></div>

                {menuItems}
            </div>
        );
    }
}

export default Carousel