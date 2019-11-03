import React from 'react';
import './Slideshow.css';

export default class Slideshow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      pins: this.props.pins,
    }

    this.Center = React.createRef();
    this.Prev = React.createRef();
    this.Next = React.createRef();
    this.Exit = React.createRef();
    
    this.close = this.close.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleMouse = this.handleMouse.bind(this);
    window.addEventListener(`keydown`, this.handleKey);
    window.addEventListener(`mousemove`, this.handleMouse);

  }

  // Just a nice blend in when the app opens up
  componentDidMount() {
    this.Prev.current.style.opacity = 1;
    this.Next.current.style.opacity = 1;
    this.Exit.current.style.opacity = 1;

    setTimeout(() => {
      this.Prev.current.style.opacity = 0;
      this.Next.current.style.opacity = 0;
      this.Exit.current.style.opacity = 0;
    }, 3000);
  }

  // Clears the event listeners so they don't carry out
  componentWillUnmount() {
    window.removeEventListener(`mousemove`, this.handleMouse);
    window.removeEventListener(`keydown`, this.handleKey);
  }

  // Closes the overlay
  close() {
    this.props.closeSlideshow();
  }

  // Moves the index of the current pin
  changePin(indexChange) {
    this.props.addMorePins(this.state.index);
    if (indexChange + this.state.index < 0) {
      this.setState({ index: this.state.pins.length - 1 });
    } else {
      this.setState({ index: (this.state.index + indexChange) % this.state.pins.length });
    }
  }
  
  handleKey(event) {
    // console.log(this.centerPin.current);
    switch(event.keyCode) {
      case 37:  // Left
        event.preventDefault();
        this.changePin(-1);
        break;
      case 38:  // Up
        event.preventDefault();
        // this.centerPin.current.scrollBy(-100);
        break;
      case 39:  // Right
        event.preventDefault();
        this.changePin(1);
        break;
      case 40:  // Down
        event.preventDefault();
        // this.centerPin.current.scrollBy(100);
        break;
      case 27:  // Escape
        event.preventDefault();
        this.close();
        break;
      default:
        break;
    }
  }

  // A nice bouse effect that makes the buttons fade when they aren't needed
  handleMouse(event) {

    // Prev
    let left = this.Prev.current.getBoundingClientRect().right + 50;
    if (event.x < left) {
      this.Prev.current.style.opacity = 1;
    } else {
      this.Prev.current.style.opacity = 0;
    }
    
    // Next
    let right = this.Next.current.getBoundingClientRect().left - 50;
    if (event.x > right) {
      this.Next.current.style.opacity = 1;
    } else {
      this.Next.current.style.opacity = 0;
    }

    // Exit
    let etop = this.Exit.current.getBoundingClientRect().bottom + 50;
    // let eleft = this.Exit.current.getBoundingClientRect().left - 50;
    if (event.x > right && event.y < etop) {
      this.Exit.current.style.opacity = 1;
    } else {
      this.Exit.current.style.opacity = 0;
    }
  }

  render () {
    return (
      <div className="overlay">
        <span 
          className="exit" 
          onClick={ this.close }
          ref={ this.Exit }>X</span>
        <div className="slideshow">
          <span 
            className="prev" 
            onClick={ () => this.changePin(-1) }
            ref={ this.Prev }>
              PREV
          </span>
          <div 
            className="scrollable" 
            onClick={ () => this.changePin(1) } 
            ref={ this.Center }>
            <img className="center-pin" src={ this.state.pins[this.state.index].image.original.url } alt="Current Pin"/>
          </div>
          <span 
            className="next" 
            onClick={ () => this.changePin(1) }
            ref={ this.Next }>
              NEXT
          </span>
        </div>
      </div>
    )
  }

}