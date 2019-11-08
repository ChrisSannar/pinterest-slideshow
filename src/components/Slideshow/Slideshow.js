import React from 'react';
import './Slideshow.css';

export default class Slideshow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }

    this.Over = React.createRef();
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
      if (this.Prev.current && this.Next.current && this.Exit.current) {
        this.Prev.current.style.opacity = 0;
        this.Next.current.style.opacity = 0;
        this.Exit.current.style.opacity = 0;
      }
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
  async changePin(indexChange) {

    // Fade out the previous image
    await new Promise(res => {
      this.Center.current.style.opacity = 0;
      setTimeout(() => {
        res(true);
      }, 200);
    });

    // Change the image (but wait if we're gathering more pins)
    this.props.addMorePins(this.state.index)
      .then(result => {
        if (!result){
          if (indexChange + this.state.index < 0) {
            this.setState({ index: this.props.pins.length - 1 });
          } else {
            this.setState({ index: (this.state.index + indexChange) % this.props.pins.length });
          }
        } else {
          this.setState({ index: this.state.index + 1});
        }
      });

  }
  
  // Provides navigation without a mouse
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

  // Adds a nice clean effect that makes the buttons fade when they aren't needed
  handleMouse(event) {
    
    // Makes the mouse disappear if not used for a few seconds
    this.Over.current.style.cursor = `pointer`;
    let self = this;
    setTimeout(() => {
      if (self.Over.current) {
        self.Over.current.style.cursor = `none`;
      }
    }, 4000);

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
    if (event.x > right && event.y < etop) {
      this.Exit.current.style.opacity = 1;
    } else {
      this.Exit.current.style.opacity = 0;
    }
  }

  async imageLoaded() {
    // Fade the image back in
    await new Promise(res => {
      setTimeout(() => {
        this.Center.current.style.opacity = 1;
        res(true);
      }, 200);
    });
  }

  render () {
    return (
      <div className="overlay" ref={ this.Over }>

        <div className="options" ref={ this.Exit }>
          <input 
            className="center-img-checkbox checkbox" 
            type="checkbox" 
            name="center-img" 
            onClick={ (temp) => {
              // Centers or Baslines the image on the page
              if (temp.target.checked){
                this.Center.current.style.alignItems = `baseline`;
              } else {
                this.Center.current.style.alignItems = `center`;
              }
          }} />
          <input 
            className="width-img-checkbox checkbox" 
            type="checkbox" 
            name="with-img" 
            onClick={ (temp) => {
              // Sets the image width to appear on the full page
              if (temp.target.checked){
                this.Center.current.children[0].style.maxHeight = `100%`;
              } else {
                this.Center.current.children[0].style.maxHeight = ``;
              }
          }} />
          <span 
            className="exit-btn" 
            onClick={ this.close }>
              X
          </span>
        </div>
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
            <img 
              className="center-pin" 
              src={ this.props.pins[this.state.index].image.original.url }
              onLoad={ this.imageLoaded.bind(this) }
              alt="Current Pin"/>
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