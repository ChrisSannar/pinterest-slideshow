import React from 'react';
import queryString from 'query-string';

import './Start.css';

export default class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = { input: "" }
  }

  render() {

    const params = queryString.parse(this.props.location.search);

    // Pauses for a minute from the redirect once we get the Authorization code data
    if (Object.keys(params).length > 0) {
      this.props.getAccessToken(params)
        .then(resp => {
          if (resp) {
            this.props.history.push(`/boards`); // Once we've got access, let them select which board
          }
        })
        .catch(err => {
          this.props.history.push(`/error`);
        });
      return (
        <div className="center-page">
          <h2>Please wait while we gather your Pinterest boards...</h2>
        </div>
      );

    // Otherwise, we just go with the normal page
    } else {
      return (
        <div className="center-page">
          <h1>Pinterest Slide Show</h1>
          <h2>Please login and the select the board you would like to preview.</h2>
          <a
            href="https://api.pinterest.com/oauth/?response_type=code&client_id=5058642322688884012&scope=read_public&state=768uyFys&redirect_uri=https://localhost:3000/"
          >Login to Pinterest</a>
        </div>
      );
    }

  }

}