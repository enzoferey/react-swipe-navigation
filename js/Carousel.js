import React from 'react'
import ReactDOM from 'react-dom';
import ReactSwipe from './ReactSwipe';
import Swipe from './Swipe';

class Carousel extends React.Component {

    constructor() {
        super();
        this.state = { position: 0, startX: 0, startY: 0, endX: 0, endY: 0, message: ''};
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
      if (Math.abs(xDelta) > 30 && Math.abs(this.state.startY - this.state.endY) < 50) {
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
                      StartX: {this.state.startX} <br/>
                      StartY: {this.state.startY} <br/><br/>
                      EndX: {this.state.endX} <br/>
                      EndY: {this.state.endY} <br/><br/>
                      Last done: {this.state.message}
                    </div>
                    <div>Blog</div>
                    <div>About</div>
                    <div>Contact</div>
                </ReactSwipe>
            </div>
        );
    }

    componentDidMount(){
        let node = ReactDOM.findDOMNode(this.refs.swipeZone);
        node.addEventListener('touchstart', this.handleStart.bind(this), false);
        node.addEventListener('touchmove', this.handleMove.bind(this), false);
        node.addEventListener('touchend', this.handleEnd.bind(this), false);
        this.setState({ message: 'Init done' });
    }

    componentWillUnmount(){
        let node = ReactDOM.findDOMNode(this.refs.swipeZone);
        node.removeEventListener('touchstart', this.handleStart);
        node.removeEventListener('touchmove', this.handleMove);
        node.removeEventListener('touchend', this.handleEnd);
    }

}

class Menu extends React.Component {

    /*
    this.click.bind(this, this.props.father, 0)

    click(parent, number) {
        this.setState({position: number});
        this.props.swipe.call(parent, number);
    }*/
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