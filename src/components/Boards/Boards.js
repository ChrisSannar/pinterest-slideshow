import React from 'react';

import './Boards.css';

export default class Boards extends React.Component {

  constructor(props) {
    super(props);
  }

  listBoards = (boardInfo) => {
    let result = [];

    boardInfo.forEach((board) => {
      let name = board.url.split(`/`)[board.url.split(`/`).length - 2];

      result.push(
        <button key={board.id} className="board-btn" onClick={() => this.props.selectBoard(name)}>
          <div className="board-text">
            { `${board.name}` }
          </div>
        </button>
      );
    })

    return result;
  }

  render() {

    return (
      <div className="center-page">
        <h2>Pick a Board</h2>
        <input name="testQuery" onChange={ this.props.inputChange }/>
        <button onClick={ this.props.makeRequest }>Go</button>
        <button onClick={ this.props.getBoards }>Get Boards</button>
        <div className="boardsDisplay">{ this.listBoards(this.props.boardInfo) }</div>
      </div>
    );

  }

}