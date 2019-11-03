import React from 'react';
import './Slideshow.css';

export default class Slideshow extends React.Component {

  // pin object: {note: "Funny memes", image: { original ... }, id: "351140102197375629"}
  // original: {url: "https://i.pinimg.com/originals/2b/2d/2e/2b2d2e2b0295d529c58f31527f9a6dcd.jpg", width: 1052, height: 1300}

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      pins: this.props.pins,
    }

    this.centerPin = React.createRef();
    
    this.close = this.close.bind(this);
    this.handleKey = this.handleKey.bind(this);
    window.addEventListener(`keydown`, this.handleKey);
  }

  // Closes the overlay
  close() {
    this.props.closeSlideshow();
  }

  // Moves the index of the current pin
  changePin(indexChange) {
    if (indexChange + this.state.index < 0) {
      this.setState({ index: this.state.pins.length - 1 });
    } else {
      this.setState({ index: (this.state.index + indexChange) % this.state.pins.length });
    }
  }
  
  handleKey(event) {
    console.log(this.centerPin.current);
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

  render () {
    return (
      <div className="overlay">
        <span className="exit" onClick={this.close}>X</span>
        <div className="slideshow">
          <span className="prev" onClick={ () => this.changePin(-1) }>PREV</span>
          <div 
            className="scrollable" 
            onClick={ () => this.changePin(1) } 
            ref={ this.centerPin }>
            <img className="center-pin" src={ this.state.pins[this.state.index].image.original.url } alt="Current Pin"/>
          </div>
          <span className="next" onClick={ () => this.changePin(1) }>NEXT</span>
        </div>
      </div>
    )
  }

}