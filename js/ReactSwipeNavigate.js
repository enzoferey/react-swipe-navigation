import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import ReactSwipe from './ReactSwipe';

class ReactSwipeNavigate extends React.Component {

    constructor() {
        super(); // give context for this
        this.state = { position: 0, startX: 0, startY: 0, endX: 0, endY: 0};
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
        if (Math.abs(xDelta) > this.props.minX && Math.abs(this.state.startY - this.state.endY) < this.props.maxY) 
        {
            // valid swipe
            this.updatePosition();
        }
    }

    handleEndMouse(e) {
        this.setState( { endX: e.clientX, endY: e.clientY } );
        
        let xDelta = this.state.startX - this.state.endX;
        if(Math.abs(xDelta) > this.props.minX && Math.abs(this.state.startY - this.state.endY) < this.props.maxY)
        {
            if(xDelta < 0)
                this.refs.panels.prev();
            else
                this.refs.panels.next();

            this.updatePosition();
        }
    }

    myClick(panel) {
        this.refs.panels.slide(panel);
        this.updatePosition();
    }

    updatePosition() {
        this.setState( { position: this.refs.panels.getPos() } )
    }

    render() {
        return (
            <div ref="swipeZone" style={{ height: '100%' }}>
                <Menu swipe={this.myClick} father={this} list={this.props.menu} position={this.state.position} speed={this.props.speed} />       
                
                <ReactSwipe ref="panels" className="carousel" swipeOptions={{speed: this.props.speed, continuous: false}}>
                    {this.props.children}
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
    
    constructor() {
        super();
        this.width = ''; 
        this.styleActive = {};
    }

    componentWillMount(){
        this.setCSS();
    }

    setCSS() {
        // Set .menu-item width respect props received
        this.width = 100 / this.props.list.length;

        // Set transition css on .active-menu equal to slide speed
        this.styleActive = {
            WebkitTransition: this.props.speed + 'ms',
            MozTransition: this.props.speed + 'ms',
            Otransition: this.props.speed + 'ms',
            transition: this.props.speed + 'ms',

            width: this.width + '%',
            left: 0
        }
    }

    render(){
        var menuItems = this.props.list.map(function(item, i) {
            return (
                <a key={item} onClick={ this.props.swipe.bind(this.props.father, i) } className="menu-item" style={{ width: this.width + '%' }}>
                    {item}
                </a>
            );
        }, this);

        return (
            <div id="menu">
                <div ref="active" className='active-menu' style={this.styleActive} key="active-menu"></div>

                {menuItems}
            </div>
        );
    }

    componentWillReceiveProps(nextProps){
        this.refs.active.style.left = this.width * nextProps.position + '%';
    }
}


ReactSwipeNavigate.defaultProps = {
    menu: [ 'Home', 'Blog', 'About', 'Contact' ], 
    // thresholds for valid swipe
    minX: 5,
    maxY: 50,
    speed: 300
}

ReactSwipeNavigate.propTypes = {
    menu: PropTypes.array,
    minX: PropTypes.number,
    maxY: PropTypes.number,
    speed: PropTypes.number
}

export default ReactSwipeNavigate