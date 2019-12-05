import React from 'react';

import './Error.css';

export default class Error extends React.Component {

  render() {

    return (
      <div className="center-page">
        <h2>There was an Error</h2>
        <p>{ this.props.errorMsg }</p>
      </div>
    );

  }

}