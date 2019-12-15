import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
} from "react-router-dom";
import axios from 'axios';
import './App.css';

import Start from './components/Start/Start.js';
import Boards from './components/Boards/Boards.js';
import Error from './components/Error/Error.js';
import Slideshow from './components/Slideshow/Slideshow.js';

/*
  Note: Some of the functions are arrow functions and some are not, just to test how 
    'this' and 'bind' work in react application.
*/

export const PINS_PER_REQUEST = 100;

// ***
export let USERNAME = `chrissannar`;
export let CURRENT_ACCESS_TOKEN = "AhGGc-cOrqBuzjIc9l25gr4VTyewFdpxa7rSRbZGM-hkAaC9LATfgDAAAIaBRjt5LA8gv40AAAAA";
export let BOARDS = [{"id":"351140170885836297","name":"Reminisce","url":"https://www.pinterest.com/chrissannar/reminisce/"},{"id":"351140170885761183","name":"Art mi Likey","url":"https://www.pinterest.com/chrissannar/art-mi-likey/"},{"id":"351140170885836302","name":"Ha","url":"https://www.pinterest.com/chrissannar/ha/"},{"id":"351140170885693089","name":"I'm Going There","url":"https://www.pinterest.com/chrissannar/im-going-there/"},{"id":"351140170885693091","name":"Art! Animation! and other fun stuff","url":"https://www.pinterest.com/chrissannar/art-animation-and-other-fun-stuff/"},{"id":"351140170885693090","name":"Lets learn some more stuff","url":"https://www.pinterest.com/chrissannar/lets-learn-some-more-stuff/"}];
// ***

export default class App extends React.Component {

  constructor(props) {
    super(props);         // Make sure we get the stuff from upstairs

    // Set our state with the access token to get it everywehre
    this.state = { 
      accessToken: CURRENT_ACCESS_TOKEN, // ***
      username: USERNAME, // ***
      boards: BOARDS,
      disableBoards: false,
      showSlides: false,
      pins: [],
      page: {},
      errorMsg: ''
    };

    // Binding the functions to use here
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getBoards = this.getBoards.bind(this);
    this.logState = this.logState.bind(this);
    this.selectBoard = this.selectBoard.bind(this);
    this.renderSlideshow = this.renderSlideshow.bind(this);
    this.chacheImages = this.cacheImages.bind(this);
  }

  // Gets the access token given the authorization info
  getAccessToken(authCodeData) {

    console.log(`AUTH`, authCodeData);
    
    if (!this.state.accessToken){
      // Have this to access 'this' inside axios callback
      var self = this;
      
      // A Promise to activate the redirect in the 'Start' component
      return new Promise(res => {
        
        // Get the access token with the Authorization code
        axios.post(`https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=5058642322688884012&client_secret=ff2c7720f5546a13cac0e631f5c11810294fb13f333a5ee3673d59df4355e23a&code=${authCodeData.code}`)
          .then(resp => {

            console.log(`RESP`, resp);

            // Save the access token to be used later
            self.setState({
              accessToken: resp.data.access_token
            });

            this.setStateWithUsername();

            res(true);
          })
          .catch(err => {
            this.setState({ errorMsg: `There was a problem with authentication. Please try again later.`})
            res(false);
          });
      });

    } else {
      return Promise.resolve(false);
    }
 
  }

  // Retrieves the username and set the state with it
  setStateWithUsername = () => {
    let self = this;
    if (self.state.accessToken) {
      axios.get(`https://api.pinterest.com/v1/me/?access_token=${this.state.accessToken}&fields=username`)
        .then(resp => {
          self.setState({
            username: resp.data.data.username
          });
        })
        .catch(err => {
          console.error(`BAD USERNAME`, err);
        });
    } else {
      console.log("NO ACCESS TOKE");
    }
  }

  // Gets a list of the users boards to allow them to pick from
  getBoards() {
    let self = this;

    // ***
    self.setState({ boards: BOARDS });
    // ***

    // axios.get(`https://api.pinterest.com/v1/me/boards/?access_token=${this.state.accessToken}&fields=id,name,url`)
    //   .then(resp => {
    //     console.log(JSON.stringify(resp.data.data));
    //     self.setState({ boards: resp.data.data });   // Set the list of boards
    //   })
    //   .catch(err => {
    //     console.error(`BAD BOARDS`, err);
    //   });
    
  }

  // Gets the data for the given board and sets the state with the given values
  selectBoard(boardName) {
    this.setState({ disableBoards: true });

    let self = this;
    axios.get(`https://api.pinterest.com/v1/boards/${this.state.username}/${boardName}/pins/?access_token=${this.state.accessToken}&limit=${PINS_PER_REQUEST}&fields=id,image,note`)
      .then(resp => {

        // Set the pins, next page, and start the slideshow
        self.setState({ 
          pins: resp.data.data, 
          page: resp.data.page, 
          showSlides: true  
        });
      })
      .catch(err => {
        console.error(`BAD BOARD`, err);
      });
  }

  // Checks the current index, and if we're at the end of the array, we need more pins
  // Returns true if more pins were retrieved, false otherwise (either bad network or end of board)
  addMorePins = (currentIndex) => {
    return new Promise((res, rej) => {
      if (currentIndex === this.state.pins.length - 1) {

        if (this.state.page) {  // If we got another page to pull
          
          axios.get(this.state.page.next)
            .then(resp => {
              this.cacheImages(resp.data.data.map(pin => pin.image.original.url));
              console.log(`RESP CON`, resp);
              this.setState({ 
                pins: this.state.pins.concat(resp.data.data),
                page: resp.data.page
              });
              res(true);
            });

        } else {
          res(false);
        }

      } else {
        res(false);
      }
    })
  }

  // Shuffles the pins to be in a random order
  shufflePins = () => {
    let result = this.state.pins;
    for (let i = 0; i < result.length; i++) {
      let randIndex = Math.floor(Math.random() * result.length);
      let temp = result[randIndex];
      result[randIndex] = result[i];
      result[i] = temp;
    }
    this.setState({ pins: result })
  }

  // This preloads the pin image so they're cached in the browser and make for a smoother performance
  async cacheImages(images) {
    images.forEach(imageLink => {
      let img = new Image();
      img.src = imageLink;
    });
  }

  // ***
  logState() {
    console.log(this.state);
  }
  // ***

  // Closes the slideshow overlay
  closeSlideshow = () => {
    this.setState({ 
      showSlides: false, 
      disableBoards: false 
    });
  }

  // Renders the slideshow overlay if the state is set to show it
  renderSlideshow() {
    if (this.state.showSlides) {
      this.cacheImages(this.state.pins.map(pin => pin.image.original.url));
      return <Slideshow
        className="slideshow"
        pins={ this.state.pins }
        closeSlideshow={ this.closeSlideshow }
        addMorePins={ this.addMorePins }
        shufflePins={ this.shufflePins }
      ></Slideshow>
    }
  }

  render() {
    
    return (
      <Router className="App">
        <button onClick={this.logState}>STATE</button>
        { this.renderSlideshow() }
        <Route 
          path="/"
          render={ (props) => <Start { ...props } getAccessToken={ this.getAccessToken }></Start> } 
          exact
        />
        <Route
          path="/boards"
          render={ (props) => {
            if (this.state.accessToken) {
              return (<Boards { ...props } 
                  boards={ this.state.boards }
                  getBoards={ this.getBoards }
                  selectBoard={ this.selectBoard }
                  disableBoards={ this.state.disableBoards }>
                </Boards>);
            } else {
              return (<Error 
                  { ...props } 
                  errorMsg={ `You don't have an access token. Go to the main page and try again.` }>
                </Error>);
            }
          }}
        />
        <Route
          path="/error"
          render={ (props) => <Error
            { ...props }
            errorMsg={ this.state.errorMsg }
          ></Error>}
        ></Route>
        <Route 
          path="/*"
          render={ (props) => <Error 
              { ...props }
              errorMsg={ `That page doesn't exist. Please go back main page.`}>
            </Error> }
        />
      </Router>
    );
  };
}