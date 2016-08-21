import React from 'react'
import ReactDOM from 'react-dom';
import ReactSwipe from './ReactSwipe';

class Carousel extends React.Component {

    constructor() {
        super(); // give context for this
        this.state = { position: 0, startX: 0, startY: 0, endX: 0, endY: 0};
        this.static = { minX: 0, maxY: 50 }; // thresholds for valid swipe
        this.menu = [ 'Home', 'Blog', 'About', 'Contact' ];
    }

    init(node) {
        node.addEventListener('touchstart', this.handleStart.bind(this), false);
        node.addEventListener('touchmove', this.handleMove.bind(this), false);
        node.addEventListener('touchend', this.handleEnd.bind(this), false);

        node.addEventListener('mousedown', this.handleStartMouse.bind(this), false);
        node.addEventListener('mouseup', this.handleEndMouse.bind(this), false);
    }

    kill(node) {
        node.removeEventListener('touchstart', this.handleStart);
        node.removeEventListener('touchmove', this.handleMove);
        node.removeEventListener('touchend', this.handleEnd);

        node.removeEventListener('mousedown', this.handleStartMouse.bind(this));
        node.removeEventListener('mouseup', this.handleEndMouse.bind(this));
    }

    handleStart(e) {  
        //single touch
        let touch = e.touches[0];
        this.setState( { startX: touch.screenX, startY: touch.screenY } );
    }

    handleStartMouse(e) {
        this.setState( { startX: e.clientX, startY: e.clientY } );
    }

    handleMove(e) {  
        let touch = e.touches[0];
        this.setState( { endX: touch.screenX, endY: touch.screenY } );
    }

    handleEnd() {
        // Calculate X difference
        let xDelta = this.state.startX - this.state.endX;
        if (Math.abs(xDelta) > this.static.minX && Math.abs(this.state.startY - this.state.endY) < this.static.maxY) {
            // valid swipe
            this.updatePosition();
        }
    }

    handleEndMouse(e) {
        this.setState( { endX: e.clientX, endY: e.clientY } );
        
        let xDelta = this.state.startX - this.state.endX;

        if(xDelta < 0)
            this.refs.habak.prev();
        else
            this.refs.habak.next();

        this.updatePosition();
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