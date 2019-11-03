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
    'this' and 'bind' work in application.
*/

export const PINS_PER_REQUEST = 25;

// ***
export const NEXT_PAGE = {"data": [{"note": "Goddammit Gaston", "image": {"original": {"url": "https://i.pinimg.com/originals/a9/aa/09/a9aa0965af0b09a2a535ec9d66e11398.jpg", "width": 480, "height": 616}}, "id": "351140102195832255"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/0c/8c/f4/0c8cf4ead0758d69910d443f969f2a44.png", "width": 375, "height": 720}}, "id": "351140102195832235"}, {"note": "The guy who shot Bambi's mom.", "image": {"original": {"url": "https://i.pinimg.com/originals/b2/c5/5d/b2c55d4f3cc622e04fd47423d04fa039.jpg", "width": 479, "height": 501}}, "id": "351140102195832197"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/7b/3a/91/7b3a913f0f1d542d553d1ec6ec364aa8.jpg", "width": 1543, "height": 3000}}, "id": "351140102195832058"}, {"note": "Humans - the most badass creatures in the galaxy. THIS IS FRIGGIN AWESOME!!!!!!!!!!!!!!!!!! READ IT!! READ EVERY LAST BIT OF IT! YOU WILL FEEL AMAZING!!!", "image": {"original": {"url": "https://i.pinimg.com/originals/b3/9f/ad/b39fad5f8535d6f5602ad19b6f0e0d35.jpg", "width": 500, "height": 3000}}, "id": "351140102195828909"}, {"note": "THE LADT ONE!!!! XD<< I understand that you find this post funny and you might have been laughing while typing, but still; It's last not ladt.", "image": {"original": {"url": "https://i.pinimg.com/originals/99/10/39/99103976f5adf67aaca25837ad526f42.jpg", "width": 248, "height": 930}}, "id": "351140102195785112"}, {"note": "How's this for alternative futures - two alternative timelines all based on being kind.  An important message... whilst it is at it!", "image": {"original": {"url": "https://i.pinimg.com/originals/5f/d0/fd/5fd0fdfb2f82931f329a00f6d05aec17.jpg", "width": 496, "height": 5186}}, "id": "351140102195667336"}, {"note": "Irony, in the Gym. The best exercise is learning to appreciate the gifts you bring, and learning to celebrate the gifts differing in others. I like the old guy!", "image": {"original": {"url": "https://i.pinimg.com/originals/e6/72/8e/e6728e8eb7d00eedabf788bf3ba57f59.jpg", "width": 661, "height": 5155}}, "id": "351140102195667313"}, {"note": "They had me for a minute...", "image": {"original": {"url": "https://i.pinimg.com/originals/0c/9e/c3/0c9ec353ccefde0046d6c39cff2d4963.jpg", "width": 388, "height": 929}}, "id": "351140102195651405"}, {"note": "They had me for a minute...", "image": {"original": {"url": "https://i.pinimg.com/originals/0c/9e/c3/0c9ec353ccefde0046d6c39cff2d4963.jpg", "width": 388, "height": 929}}, "id": "351140102195651399"}, {"note": "Blue Shell Soft Enamel Pin Mario Kart Nintendo", "image": {"original": {"url": "https://i.pinimg.com/originals/a0/c8/4b/a0c84baa21f3a2f8ccf99597da03a5a6.jpg", "width": 570, "height": 760}}, "id": "351140102195599350"}, {"note": "If you say you didn't read that in his voice you're lying", "image": {"original": {"url": "https://i.pinimg.com/originals/24/5e/12/245e120f0b95bf925e1e2c33e90275aa.jpg", "width": 403, "height": 748}}, "id": "351140102195588940"}, {"note": "Wait for it...", "image": {"original": {"url": "https://i.pinimg.com/originals/9c/41/bd/9c41bd4a26738855f7fadffacb04fd43.png", "width": 540, "height": 4946}}, "id": "351140102195588818"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/ee/cb/bd/eecbbd831072b742cb2f57d1f1d68476.jpg", "width": 540, "height": 960}}, "id": "351140102195564764"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/f8/d7/cb/f8d7cb13114d1359d9a1eaaabb517a7f.jpg", "width": 479, "height": 640}}, "id": "351140102195454234"}, {"note": "46 Science Memes For The Nerds Among Us", "image": {"original": {"url": "https://i.pinimg.com/originals/c1/d1/bf/c1d1bf84afc6141cfe26e2d090b0e916.jpg", "width": 600, "height": 723}}, "id": "351140102195454156"}, {"note": "OMG Harry Potter is a princess!!! #PotterALWAYS #harrypotterquotes", "image": {"original": {"url": "https://i.pinimg.com/originals/ab/e1/52/abe152663c34924027d8d4ff076e6f58.jpg", "width": 943, "height": 1200}}, "id": "351140102195353442"}, {"note": "Ouch - Album on Imgur", "image": {"original": {"url": "https://i.pinimg.com/originals/35/22/d0/3522d020590f2b30d70518c93023ba75.jpg", "width": 728, "height": 732}}, "id": "351140102195284680"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/ed/f9/8a/edf98ad437bb3398d88449d3ac4d7fc0.jpg", "width": 1242, "height": 1812}}, "id": "351140102194911638"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/dd/20/73/dd20733ae14b012fbb3386fe926d22ff.jpg", "width": 1200, "height": 1602}}, "id": "351140102194526867"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/28/62/f8/2862f86f7c300e1cb291d649fd8ad2ba.png", "width": 880, "height": 5261}}, "id": "351140102194425104"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/f6/06/d8/f606d89cf3bf1292d7029aeb041be3ab.jpg", "width": 640, "height": 1136}}, "id": "351140102194305269"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/04/61/21/046121c37ea7830b3471bbb8186b0940.jpg", "width": 640, "height": 1765}}, "id": "351140102194295741"}, {"note": "Einstein Relativity Hadouken: E=mc\u00b2", "image": {"original": {"url": "https://i.pinimg.com/originals/03/63/fb/0363fbe980c484cd9c726c6c8ac1970f.jpg", "width": 750, "height": 750}}, "id": "351140102194149258"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/b2/e1/09/b2e10979b763fac72e05a6b8a7df3c81.png", "width": 711, "height": 960}}, "id": "351140102194149145"}], "page": {"cursor": "LT4zNTExNDAxMDIxOTQxNDkxNDV8NDl8N2RhZmU4YmMzYzZlMzQ3NzE0MGVmNGIzYTUwYTc5OTFiMDY4ZDlkODY4YWJhZTU3YmY2ZTlkZDNhOGJjOGI2OXxORVd8", "next": "https://api.pinterest.com/v1/boards/chrissannar/ha/pins/?access_token=AonrCUbSMKR-Uezxmzl5jWSzA-ZMFdG_dGdoBEpGM-hkAaC9LATfgDAAAIaBRjt5LA8gv40AAAAA&fields=id%2Cimage%2Cnote&cursor=LT4zNTExNDAxMDIxOTQxNDkxNDV8NDl8N2RhZmU4YmMzYzZlMzQ3NzE0MGVmNGIzYTUwYTc5OTFiMDY4ZDlkODY4YWJhZTU3YmY2ZTlkZDNhOGJjOGI2OXxORVd8"}};
// ***

export default class App extends React.Component {

  constructor(props) {
    super(props);         // Make sure we get the stuff from upstairs

    // ***
    let currentAccessToken = `AonrCUbSMKR-Uezxmzl5jWSzA-ZMFdG_dGdoBEpGM-hkAaC9LATfgDAAAIaBRjt5LA8gv40AAAAA`;
    // ***

    // ***
    let temp = [{
        "url": "https://www.pinterest.com/chrissannar/ha/",
        "id": "351140170885836302",
        "name": "Ha"
      }];
    // ***

    // Set our state with the access token to get it everywehre
    this.state = { 
      accessToken: currentAccessToken,
      query: ``, // ***
      boardInfo: temp,  // [], ***
      disableBoards: false,
      username: `chrissannar`, // ``, ***
      showSlides: false, // false,
      pins: [1,2,3],
      page: {}
    };

    // Binding the functions to use here
    this.getAccessToken = this.getAccessToken.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.getBoards = this.getBoards.bind(this);
    this.logState = this.logState.bind(this);
    this.selectBoard = this.selectBoard.bind(this);
    this.renderSlideshow = this.renderSlideshow.bind(this);
    // this.closeSlideshow = this.closeSlideshow.bind(this);
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

            this.setStateWithUsername();

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

  // Retrieves the username and set the state with it
  setStateWithUsername = () => {
    let self = this;
    axios.get(`https://api.pinterest.com/v1/me/?access_token=${this.resp.data.access_token}&fields=username`)
      .then(resp => {
        self.setState({
          username: resp.data.data.username
        });
      })
      .catch(err => {
        console.error(`BAD USERNAME`, err);
      });
  }

  // *** These are here to test out the data we're getting back from the api
  inputChange(event) {
    this.setState({ query: event.target.value });
  }

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
        self.setState({ boardInfo: resp.data.data });   // Set the list of boards
      })
      .catch(err => {
        console.error(`BAD BOARDS`, err);
      });
    
  }

  // Gets the data for the given board and sets the state with the given values
  selectBoard(boardName) {
    this.setState({ disableBoards: true });

    // ***
    // let temp = [{
    //     "note": "Funny memes",
    //     "image": {
    //         "original": {
    //             "url": "https://i.pinimg.com/originals/2b/2d/2e/2b2d2e2b0295d529c58f31527f9a6dcd.jpg",
    //             "width": 1052,
    //             "height": 1300
    //         }
    //     },
    //     "id": "351140102197375629"
    // }, {
    //     "note": "Good Old Krod, The Half-Orc Rogue... with a Flail. - Imgur",
    //     "image": {
    //         "original": {
    //             "url": "https://i.pinimg.com/originals/35/9c/06/359c06a8d5ce831d3b87b4bf93f936e4.jpg",
    //             "width": 640,
    //             "height": 1748
    //         }
    //     },
    //     "id": "351140102197252913"
    // }, {
    //     "note": "My 47 Wholesome 'Cat's Café' Comics That Will Make Your Day",
    //     "image": {
    //         "original": {
    //             "url": "https://i.pinimg.com/originals/5b/88/d4/5b88d4284211b83c844d1933e090bdbd.jpg",
    //             "width": 880,
    //             "height": 1343
    //         }
    //     },
    //     "id": "351140102197104696"
    // }]

    // this.setState({ 
    //   pins: temp, 
    //   showSlides: true 
    // });

    // ***

    let self = this;
    axios.get(`https://api.pinterest.com/v1/boards/${this.state.username}/${boardName}/pins/?access_token=${this.state.accessToken}&fields=id,image,note`)
      .then(resp => {
        console.log(`PINS`, resp);

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

  // Checks the current index, and if pass the point, adds more pins
  addMorePins = (currentIndex) => {
    console.log(currentIndex, currentIndex % PINS_PER_REQUEST, PINS_PER_REQUEST - 2);
    if (currentIndex % PINS_PER_REQUEST === PINS_PER_REQUEST - 2) {
      
      // ***
      // let newPins = NEXT_PAGE.data;
      // let moar = this.state.pins;
      // moar = moar.concat(newPins);
      // console.log(`MOAR`, newPins, moar);
      // this.setState({ 
      //   pins: moar,
      //   page: NEXT_PAGE.page
      // }); 
      // ***

      axios.get(this.state.page.next)
        .then(resp => {
          this.setState({ 
            pins: this.state.pins.concat(resp.data),
            page: resp.page
          });
        });
    }
  }

  // Renders the slideshow overlay if the state is set to show it
  renderSlideshow() {
    if (this.state.showSlides) {
      return <Slideshow
        className="slideshow"
        pins={ this.state.pins }
        closeSlideshow={ this.closeSlideshow }
        addMorePins={ this.addMorePins }
      ></Slideshow>
    }
  }

  render() {
    
    return (
      <Router className="App">
        <button onClick={ this.logState }>STATE</button>
        { this.renderSlideshow() }
        <Route 
          path="/"
          render={ (props) => <Start { ...props } getAccessToken={ this.getAccessToken }></Start> } 
          exact
        />
        <Route
          path="/boards"
          render={ (props) => 
            <Boards { ...props } 
              boards={ this.state.boardInfo }
              makeRequest={ this.makeRequest } 
              inputChange={ this.inputChange }
              getBoards={ this.getBoards }
              boardInfo={ this.state.boardInfo }
              selectBoard={ this.selectBoard }
              disableBoards={ this.state.disableBoards }>
            </Boards> }
        />
        <Route 
          path="/error"
          render={ (props) => <Error { ...props }></Error> }
        />
      </Router>
    );
  };
}
