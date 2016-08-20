import React from 'react'
import ReactDOM from 'react-dom';
import ReactSwipe from './ReactSwipe';

class Carousel extends React.Component {

    constructor() {
        super();
        this.state = { position: 0, startX: 0, startY: 0, endX: 0, endY: 0, message: ''};
        this.static = { minX: 0, maxY: 50 };
    }

    init(node) {
        node.addEventListener('touchstart', this.handleStart.bind(this), false);
        node.addEventListener('touchmove', this.handleMove.bind(this), false);
        node.addEventListener('touchend', this.handleEnd.bind(this), false);
        this.setState({ message: 'Init done' });
    }

    handleStart(e) {  
      // assuming single touch, e.touches is an Array of all touches,
      // but with single touch there is only one element
      let touch = e.touches[0];
      this.setState( { startX: touch.screenX, startY: touch.screenY, message: 'Start done' } );
    }

    handleMove(e) {  
      let touch = e.touches[0];
      this.setState( { endX: touch.screenX, endY: touch.screenY, message: 'Move done' } );
    }

    handleEnd() {  
      let xDelta = this.state.startX - this.state.endX;
      this.setState({ message: 'End done, dif: ' + xDelta });
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
        return (
            <div ref="swipeZone" style={{ height: '100%' }}>

                <Menu swipe={this.myClick} father={this} position={this.state.position} />       

                <ReactSwipe ref='habak' className="carousel" swipeOptions={{continuous: false}}>
                    <div>
                      HOME <br/>
                      StartX: {this.state.startX} <br/>
                      StartY: {this.state.startY} <br/><br/>
                      EndX: {this.state.endX} <br/>
                      EndY: {this.state.endY} <br/><br/>
                      Last done: {this.state.message}
                    </div>
                    <div>
                      BLOG <br/>
                      StartX: {this.state.startX} <br/>
                      StartY: {this.state.startY} <br/><br/>
                      EndX: {this.state.endX} <br/>
                      EndY: {this.state.endY} <br/><br/>
                      Last done: {this.state.message}
                    </div>
                    <div>
                      ABOUT <br/>
                      StartX: {this.state.startX} <br/>
                      StartY: {this.state.startY} <br/><br/>
                      EndX: {this.state.endX} <br/>
                      EndY: {this.state.endY} <br/><br/>
                      Last done: {this.state.message}
                    </div>
                    <div>
                      CONTACT <br/>
                      StartX: {this.state.startX} <br/>
                      StartY: {this.state.startY} <br/><br/>
                      EndX: {this.state.endX} <br/>
                      EndY: {this.state.endY} <br/><br/>
                      Last done: {this.state.message}
                    </div>
                </ReactSwipe>
            </div>
        );
    }

    componentDidMount(){
        this.init(ReactDOM.findDOMNode(this.refs.swipeZone));
    }

    componentWillUnmount(){
        let node = ReactDOM.findDOMNode(this.refs.swipeZone);
        node.removeEventListener('touchstart', this.handleStart);
        node.removeEventListener('touchmove', this.handleMove);
        node.removeEventListener('touchend', this.handleEnd);
    }

}

class Menu extends React.Component {

    render(){
        var myClass = 'active-menu position' + this.props.position;
        return (
            <div id="menu">
                <div className={myClass} key="active-menu"></div>

                <a onClick={this.props.swipe.bind(this.props.father, 0)} className="menu-item">Home</a>
                <a onClick={this.props.swipe.bind(this.props.father, 1)} className="menu-item">Blog</a>
                <a onClick={this.props.swipe.bind(this.props.father, 2)} className="menu-item">About</a>
                <a onClick={this.props.swipe.bind(this.props.father, 3)} className="menu-item">Contact</a>
            </div>
        );
    }
}

export default Carousel