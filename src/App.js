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

export default class App extends React.Component {

  constructor(props) {
    super(props);         // Make sure we get the stuff from upstairs

    // ***
    let currentAccessToken = `AonrCUbSMKR-Uezxmzl5jWSzA-ZMFdG_dGdoBEpGM-hkAaC9LATfgDAAAIaBRjt5LA8gv40AAAAA`;
    // ***

    let temp = [{
        "url": "https://www.pinterest.com/chrissannar/ha/",
        "id": "351140170885836302",
        "name": "Ha"
      }];

    // Set our state with the access token to get it everywehre
    this.state = { 
      accessToken: currentAccessToken,
      query: ``, // ***
      boardInfo: temp,  // [], ***
      username: `chrissannar`, // ``, ***
      showSlides: false,
      pins: [],
      page: {}
    };

    // Binding the functions to use here
    this.getAccessToken = this.getAccessToken.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.getBoards = this.getBoards.bind(this);
    this.logState = this.logState.bind(this);
    this.selectBoard = this.selectBoard.bind(this);
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
            console.log(`GOT DATA`, resp.data); // ***

            // Save the access token to be used later
            self.setState({
              accessToken: resp.data.access_token
            });

            // Retrieve the username and set the state with it
            axios.get(`https://api.pinterest.com/v1/me/?access_token=${this.resp.data.access_token}&fields=username`)
              .then(resp => {
                self.setState({
                  username: resp.data.data.username
                });
              })
              .catch(err => {
                console.error(`BAD USERNAME`, err);
              })

            res(true);
          })
          .catch(err => {
            console.log(`BAD AUTH ERR`, err);
            res(false);
          });
      });

    } else {
      return Promise.resolve(false);
    }
 
  }

  // *** These are here to test out the data we're getting back from the api
  inputChange(event) {
    this.setState({ query: event.target.value });
  }

  // ***
  makeRequest() {

    // Current: look up pins
    if (this.state.query.length > 0) {
      axios.get(`https://api.pinterest.com/v1/me/pins/?access_token=${this.state.accessToken}`)
        .then(resp => {
          console.log(`PINS`, resp);
        })
        .catch(err => {
          console.error(`BAD PINS`, err);
        });
      // axios.get(`https://api.pinterest.com/${this.state.query}/?access_token=${this.state.accessToken}`)
      //   .then(resp => {
      //     console.log(resp);
      //   })
      //   .catch(err => {
      //     console.error(`ERR`, err);
      //   });
    }
  }
  // ***

  // Gets a list of the users boards to allow them to pick from
  getBoards() {
    let self = this;

    axios.get(`https://api.pinterest.com/v1/me/boards/?access_token=${this.state.accessToken}&fields=id,name,url`)
      .then(resp => {
        console.log(`BOARDS`, resp);
        self.setState({ boardInfo: resp.data.data });
      })
      .catch(err => {
        console.error(`BAD BOARDS`, err);
      });
    
  }

  selectBoard(boardName) {
    let self = this;
    // console.log(`https://api.pinterest.com/v1/boards/${this.state.username}/${boardName}/pins/?access_token=${this.state.accessToken}`);//&fields=id,image,note`);
    axios.get(`https://api.pinterest.com/v1/boards/${this.state.username}/${boardName}/pins/?access_token=${this.state.accessToken}&fields=id,image,note`)
      .then(resp => {
        console.log(`PINS`, resp);
        self.setState({ pins: resp.data.data });
        self.setState({ page: resp.data.page });
      })
      .catch(err => {
        console.error(`BAD BOARD`, err);
      });
  }

  // ***
  logState() {
    console.log(this.state);
  }
  // ***

  renderSlideshow() {
    if (this.state.showSlides) {
      return <Slideshow
        pins={ this.state.pins }
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
          render={(props) => <Start { ...props } getAccessToken={ this.getAccessToken }></Start>} 
          exact
        />
        <Route
          path="/boards"
          render={(props) => <Boards { ...props } 
          boards={ this.state.boardInfo }
          makeRequest={ this.makeRequest } 
          inputChange={ this.inputChange }
          getBoards={ this.getBoards }
          boardInfo={ this.state.boardInfo }
          selectBoard={ this.selectBoard }></Boards>}
        />
        <Route 
          path="/error"
          render={(props) => <Error { ...props }></Error>}
        />
      </Router>
    );
  };
}
