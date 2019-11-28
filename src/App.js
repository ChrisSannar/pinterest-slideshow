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
export const NEXT_PAGE = {"data": [{"note": "Goddammit Gaston", "image": {"original": {"url": "https://i.pinimg.com/originals/a9/aa/09/a9aa0965af0b09a2a535ec9d66e11398.jpg", "width": 480, "height": 616}}, "id": "351140102195832255"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/0c/8c/f4/0c8cf4ead0758d69910d443f969f2a44.png", "width": 375, "height": 720}}, "id": "351140102195832235"}, {"note": "The guy who shot Bambi's mom.", "image": {"original": {"url": "https://i.pinimg.com/originals/b2/c5/5d/b2c55d4f3cc622e04fd47423d04fa039.jpg", "width": 479, "height": 501}}, "id": "351140102195832197"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/7b/3a/91/7b3a913f0f1d542d553d1ec6ec364aa8.jpg", "width": 1543, "height": 3000}}, "id": "351140102195832058"}, {"note": "Humans - the most badass creatures in the galaxy. THIS IS FRIGGIN AWESOME!!!!!!!!!!!!!!!!!! READ IT!! READ EVERY LAST BIT OF IT! YOU WILL FEEL AMAZING!!!", "image": {"original": {"url": "https://i.pinimg.com/originals/b3/9f/ad/b39fad5f8535d6f5602ad19b6f0e0d35.jpg", "width": 500, "height": 3000}}, "id": "351140102195828909"}, {"note": "THE LADT ONE!!!! XD<< I understand that you find this post funny and you might have been laughing while typing, but still; It's last not ladt.", "image": {"original": {"url": "https://i.pinimg.com/originals/99/10/39/99103976f5adf67aaca25837ad526f42.jpg", "width": 248, "height": 930}}, "id": "351140102195785112"}, {"note": "How's this for alternative futures - two alternative timelines all based on being kind.  An important message... whilst it is at it!", "image": {"original": {"url": "https://i.pinimg.com/originals/5f/d0/fd/5fd0fdfb2f82931f329a00f6d05aec17.jpg", "width": 496, "height": 5186}}, "id": "351140102195667336"}, {"note": "Irony, in the Gym. The best exercise is learning to appreciate the gifts you bring, and learning to celebrate the gifts differing in others. I like the old guy!", "image": {"original": {"url": "https://i.pinimg.com/originals/e6/72/8e/e6728e8eb7d00eedabf788bf3ba57f59.jpg", "width": 661, "height": 5155}}, "id": "351140102195667313"}, {"note": "They had me for a minute...", "image": {"original": {"url": "https://i.pinimg.com/originals/0c/9e/c3/0c9ec353ccefde0046d6c39cff2d4963.jpg", "width": 388, "height": 929}}, "id": "351140102195651405"}, {"note": "They had me for a minute...", "image": {"original": {"url": "https://i.pinimg.com/originals/0c/9e/c3/0c9ec353ccefde0046d6c39cff2d4963.jpg", "width": 388, "height": 929}}, "id": "351140102195651399"}, {"note": "Blue Shell Soft Enamel Pin Mario Kart Nintendo", "image": {"original": {"url": "https://i.pinimg.com/originals/a0/c8/4b/a0c84baa21f3a2f8ccf99597da03a5a6.jpg", "width": 570, "height": 760}}, "id": "351140102195599350"}, {"note": "If you say you didn't read that in his voice you're lying", "image": {"original": {"url": "https://i.pinimg.com/originals/24/5e/12/245e120f0b95bf925e1e2c33e90275aa.jpg", "width": 403, "height": 748}}, "id": "351140102195588940"}, {"note": "Wait for it...", "image": {"original": {"url": "https://i.pinimg.com/originals/9c/41/bd/9c41bd4a26738855f7fadffacb04fd43.png", "width": 540, "height": 4946}}, "id": "351140102195588818"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/ee/cb/bd/eecbbd831072b742cb2f57d1f1d68476.jpg", "width": 540, "height": 960}}, "id": "351140102195564764"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/f8/d7/cb/f8d7cb13114d1359d9a1eaaabb517a7f.jpg", "width": 479, "height": 640}}, "id": "351140102195454234"}, {"note": "46 Science Memes For The Nerds Among Us", "image": {"original": {"url": "https://i.pinimg.com/originals/c1/d1/bf/c1d1bf84afc6141cfe26e2d090b0e916.jpg", "width": 600, "height": 723}}, "id": "351140102195454156"}, {"note": "OMG Harry Potter is a princess!!! #PotterALWAYS #harrypotterquotes", "image": {"original": {"url": "https://i.pinimg.com/originals/ab/e1/52/abe152663c34924027d8d4ff076e6f58.jpg", "width": 943, "height": 1200}}, "id": "351140102195353442"}, {"note": "Ouch - Album on Imgur", "image": {"original": {"url": "https://i.pinimg.com/originals/35/22/d0/3522d020590f2b30d70518c93023ba75.jpg", "width": 728, "height": 732}}, "id": "351140102195284680"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/ed/f9/8a/edf98ad437bb3398d88449d3ac4d7fc0.jpg", "width": 1242, "height": 1812}}, "id": "351140102194911638"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/dd/20/73/dd20733ae14b012fbb3386fe926d22ff.jpg", "width": 1200, "height": 1602}}, "id": "351140102194526867"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/28/62/f8/2862f86f7c300e1cb291d649fd8ad2ba.png", "width": 880, "height": 5261}}, "id": "351140102194425104"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/f6/06/d8/f606d89cf3bf1292d7029aeb041be3ab.jpg", "width": 640, "height": 1136}}, "id": "351140102194305269"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/04/61/21/046121c37ea7830b3471bbb8186b0940.jpg", "width": 640, "height": 1765}}, "id": "351140102194295741"}, {"note": "Einstein Relativity Hadouken: E=mc\u00b2", "image": {"original": {"url": "https://i.pinimg.com/originals/03/63/fb/0363fbe980c484cd9c726c6c8ac1970f.jpg", "width": 750, "height": 750}}, "id": "351140102194149258"}, {"note": " ", "image": {"original": {"url": "https://i.pinimg.com/originals/b2/e1/09/b2e10979b763fac72e05a6b8a7df3c81.png", "width": 711, "height": 960}}, "id": "351140102194149145"}], "page": {"cursor": "LT4zNTExNDAxMDIxOTQxNDkxNDV8NDl8N2RhZmU4YmMzYzZlMzQ3NzE0MGVmNGIzYTUwYTc5OTFiMDY4ZDlkODY4YWJhZTU3YmY2ZTlkZDNhOGJjOGI2OXxORVd8", "next": "https://api.pinterest.com/v1/boards/chrissannar/ha/pins/?access_token=AonrCUbSMKR-Uezxmzl5jWSzA-ZMFdG_dGdoBEpGM-hkAaC9LATfgDAAAIaBRjt5LA8gv40AAAAA&fields=id%2Cimage%2Cnote&cursor=LT4zNTExNDAxMDIxOTQxNDkxNDV8NDl8N2RhZmU4YmMzYzZlMzQ3NzE0MGVmNGIzYTUwYTc5OTFiMDY4ZDlkODY4YWJhZTU3YmY2ZTlkZDNhOGJjOGI2OXxORVd8"}};
export const BOARDS = [ {url: `#`, id: 0, name: `asdf`}, {url: `#`, id: 1, name: `qwer`}, {url: `#`, id: 2, name: `derp`}, {url: `#`, id: 3, name: `sterb`} ];
export let USERNAME = `chrissannar`;
export let CURRENT_ACCESS_TOKEN = "AhGGc-cOrqBuzjIc9l25gr4VTyewFdpxa7rSRbZGM-hkAaC9LATfgDAAAIaBRjt5LA8gv40AAAAA";
// ***

export default class App extends React.Component {

  constructor(props) {
    super(props);         // Make sure we get the stuff from upstairs

    // ***
    // ***

    // Set our state with the access token to get it everywehre
    this.state = { 
      accessToken: CURRENT_ACCESS_TOKEN, // ***
      username: USERNAME, // ***
      boards: BOARDS, // ***
      disableBoards: false,
      showSlides: false,
      pins: [],
      page: {}
    };

    // Binding the functions to use here
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getBoards = this.getBoards.bind(this);
    this.logState = this.logState.bind(this);
    this.selectBoard = this.selectBoard.bind(this);
    this.renderSlideshow = this.renderSlideshow.bind(this);
    this.chacheImages = this.cacheImages.bind(this);
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

            console.log(`RESP`, resp);

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
    self.setState({ boards: BOARDS })
    // ***

    // axios.get(`https://api.pinterest.com/v1/me/boards/?access_token=${this.state.accessToken}&fields=id,name,url`)
    //   .then(resp => {
    //     self.setState({ boards: resp.data.data });   // Set the list of boards
    //   })
    //   .catch(err => {
    //     console.error(`BAD BOARDS`, err);
    //   });
    
  }

  // Gets the data for the given board and sets the state with the given values
  selectBoard(boardName) {
    this.setState({ disableBoards: true });

    // ***
    // this.setState({ 
    //   pins: TEMP_PINS, 
    //   showSlides: true 
    // });
    // ***

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
          // ***
          // this.cacheImages(NEXT_PAGE.data.map(pin => pin.image.original.url));
          // this.setState({ 
          //   pins: this.state.pins.concat(NEXT_PAGE.data),
          //   page: null, // NEXT_PAGE.page
          // });
  
          // setTimeout(() => {
          //   console.log(`TIME`);
          //   res(true);
          // }, 200);
          // ***
          
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
          render={ (props) => 
            <Boards { ...props } 
              boards={ this.state.boards }
              getBoards={ this.getBoards }
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

// ***
export const TEMP_PINS = [{
  "note": "Funny memes",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/2b/2d/2e/2b2d2e2b0295d529c58f31527f9a6dcd.jpg",
          "width": 1052,
          "height": 1300
      }
  },
  "id": "351140102197375629"
}, {
  "note": "Good Old Krod, The Half-Orc Rogue... with a Flail. - Imgur",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/35/9c/06/359c06a8d5ce831d3b87b4bf93f936e4.jpg",
          "width": 640,
          "height": 1748
      }
  },
  "id": "351140102197252913"
}, {
  "note": "My 47 Wholesome 'Cat's Café' Comics That Will Make Your Day",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/5b/88/d4/5b88d4284211b83c844d1933e090bdbd.jpg",
          "width": 880,
          "height": 1343
      }
  },
  "id": "351140102197104696"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/a0/58/df/a058dfa8ae776372e50c81b4a847b9f4.jpg",
          "width": 480,
          "height": 480
      }
  },
  "id": "351140102196638923"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/85/87/41/8587418ac72e4f2fe61ea59916dda6d4.jpg",
          "width": 543,
          "height": 701
      }
  },
  "id": "351140102196587746"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/c4/d3/da/c4d3da058d70fb454eb2347e1b3bad91.jpg",
          "width": 533,
          "height": 417
      }
  },
  "id": "351140102196549914"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/97/2f/6f/972f6fb75bbeadd80a56220bd3a89c10.jpg",
          "width": 710,
          "height": 960
      }
  },
  "id": "351140102196412962"
}, {
  "note": "Well WE know that...",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/40/a4/d6/40a4d693a6c84f194793cebdc7a4ab3e.jpg",
          "width": 570,
          "height": 570
      }
  },
  "id": "351140102196352768"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/5c/2b/71/5c2b7155195cb89ac1593520fdec96af.jpg",
          "width": 690,
          "height": 1237
      }
  },
  "id": "351140102196310868"
}, {
  "note": "tiger jumping to catch meat and falling in the water",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/a5/4c/57/a54c57fe156ccecf12fc8fe96b3e76dd.jpg",
          "width": 480,
          "height": 854
      }
  },
  "id": "351140102196208696"
}, {
  "note": "Hooray for teamwork!",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/54/ef/98/54ef9850edd027f520b626ea8aaa696f.png",
          "width": 800,
          "height": 4122
      }
  },
  "id": "351140102196079503"
}, {
  "note": "This will be a lot shorter movie",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/87/79/83/87798351b167a60397f58c8df5186f07.jpg",
          "width": 800,
          "height": 995
      }
  },
  "id": "351140102196030240"
}, {
  "note": "Owlturd Comics Okay but seriously, how the heck do I keep turning my alarm off without waking up!!! I get so mad about this problem with me! T^T and the worst part is that idk how to solve this problem!",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/d6/7d/2c/d67d2cb696c25dcf6582626f0de490d4.png",
          "width": 880,
          "height": 4642
      }
  },
  "id": "351140102196030092"
}, {
  "note": "Pinterest:@jalissalyons",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/d8/60/7b/d8607b450efe051a155cef4334a6ab7f.jpg",
          "width": 535,
          "height": 720
      }
  },
  "id": "351140102196000688"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/f8/19/78/f819781baa0289c31b382bbcfdfce284.png",
          "width": 478,
          "height": 720
      }
  },
  "id": "351140102196000681"
}, {
  "note": "Oh, Debbie",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/cd/6c/a3/cd6ca30624802a50d0f5d04bd79956b8.jpg",
          "width": 500,
          "height": 375
      }
  },
  "id": "351140102196000673"
}, {
  "note": ".",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/15/ad/2a/15ad2a7f0edbc4bbdd27ae0e70d88c71.jpg",
          "width": 640,
          "height": 1136
      }
  },
  "id": "351140102196000670"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/95/60/2c/95602c30ab8d2e2dec3a8b42a3074d3b.jpg",
          "width": 421,
          "height": 750
      }
  },
  "id": "351140102196000658"
}, {
  "note": "21 Of The Funniest Pics On The Net",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/1a/54/66/1a54660072cdb3f78374cd7f0ad0b386.jpg",
          "width": 460,
          "height": 344
      }
  },
  "id": "351140102196000652"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/98/18/f7/9818f76589e0e6ca7bcd8057684bded8.jpg",
          "width": 250,
          "height": 309
      }
  },
  "id": "351140102195972788"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/77/c4/52/77c4529b1868705d66769282c17178f3.jpg",
          "width": 640,
          "height": 619
      }
  },
  "id": "351140102195960675"
}, {
  "note": "reddit: the front page of the internet",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/79/7c/11/797c114f659cfb6958fa07861d6b8ef1.jpg",
          "width": 640,
          "height": 853
      }
  },
  "id": "351140102195958897"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/aa/8d/d0/aa8dd0c84cc9100bbad227c842994db5.jpg",
          "width": 540,
          "height": 635
      }
  },
  "id": "351140102195903182"
}, {
  "note": " ",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/49/1c/aa/491caa5650eddb979ab4f64434d91aa5.jpg",
          "width": 640,
          "height": 887
      }
  },
  "id": "351140102195903169"
}, {
  "note": "Poor kids | go to www.thegreatmemes.com for more funny posts",
  "image": {
      "original": {
          "url": "https://i.pinimg.com/originals/7d/d6/2b/7dd62b4253c24d84dba68e3763edd110.jpg",
          "width": 750,
          "height": 1007
      }
  },
  "id": "351140102195878990"
}];
// ***
