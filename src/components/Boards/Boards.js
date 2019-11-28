import React from 'react';

import './Boards.css';

export default class Boards extends React.Component {

  constructor(props) {
    super(props);
    this.props.getBoards();
    this.state = {
      moveDown: { opacity: 0 },
      boardStyle: []
    };
  }

  componentDidMount() {
    let self = this;

    // Set the opacity of each board to be 0, but also save the style preferences in the state
    let tempBoardStyles = [];
    this.props.boards.forEach(board => {
      tempBoardStyles.push({ opacity: 0 });
    })
    this.setState({ boardStyle: tempBoardStyles });

    // Have the title float in
    setTimeout( function() {
      self.setState({ moveDown: { transform: `translate(0, 20%)`, opacity: 1 } });
    }, 500);

    // Then wait before having each board name fade in one at a time
    setTimeout(function() {
      let i = 0;
      let interval = setInterval(() => {
        if (i < self.state.boardStyle.length) {
          // Setting each style in the state
          tempBoardStyles[i++] = { opacity: 1, transition: `0.5s` };  
          self.setState({ boardStyle: tempBoardStyles });
        }
        else {
          // Once we're done, clear the interval and reset the transition
          clearInterval(interval);
          tempBoardStyles = [];
          self.props.boards.forEach(board => {
            tempBoardStyles.push({ opacity: 1, transition: `0.15s` });
          })
          self.setState({ boardStyle: tempBoardStyles });
        }
      }, 200);
    }, 1000);
  }

  // Adds a button for each board that the user has
  listBoards = (boards) => {
    let result = [];

    boards.forEach((board, i) => {

      let name = board.url.split(`/`)[board.url.split(`/`).length - 2];

      result.push(
        <button 
          key={ board.id }
          className={ this.props.disableBoards ? `board-btn-disabled` : `board-btn` }
          disabled={ this.props.disableBoards }
          onClick={ () => this.props.selectBoard(name) }
          style={ this.state.boardStyle[i] }>
          <div className="board-text">
            { `${board.name}` }
          </div>
        </button>
      );
    });

    return result;
  }

  render() {

    return (
      <div className="center-page-boards">
        <h2 style={ this.state.moveDown }>Pick a Board</h2>
        <div className="boardsDisplay">{ this.listBoards(this.props.boards) }</div>
      </div>
    );

  }

}