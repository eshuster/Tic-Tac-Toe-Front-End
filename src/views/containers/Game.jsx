import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TitleBar from './TitleBar.jsx';

import Grid from 'material-ui/Grid';

import { gameOperations } from '../../state/modules/game';

import Board from '../components/Board.jsx';
import PlayerInfo from '../components/PlayerInfo.jsx';
import GameoverDialog from '../components/GameoverDialog.jsx';

class Game extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { 
      showDialog: false,
      playerOneId: '',
      playerOneName: '',
      playerOneSymbol: 'X',
      playerTwoId: '',
      playerTwoName: '',
      playerTwoSymbol: 'O'
    };

    this.handleBoardOnMove = this.handleBoardOnMove.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.player.playerOne != null){
      this.setState({playerOneId: nextProps.player.playerOne.playerOneId, playerOneName: nextProps.player.playerOne.playerOneName, playerTwoId: nextProps.player.playerTwo.playerTwoId, playerTwoName: nextProps.player.playerTwo.playerTwoName })
    }
    console.log(nextProps)
    if (nextProps.winner != -1) {
      this.setState({showDialog: true})
    }

  }

  updatePlayerState(playerInfo) {

  }

  handleBoardOnMove(square) {
    const { board, gameover, playTurn, checkWinner } = this.props;
    const { row, col } = square;
   
    if (gameover || typeof board[row][col] !==  'object') {
      return;
    }

    let player = {};

    if (this.props.player.playerOne) {
      player = {"playerOneId": this.state.playerOneId, "playerOneName": this.state.playerOneName, "playerSymbol": this.state.playerOneSymbol } 
    } 
    else {
      if (this.props.player.playerOneId) {
        player = {"playerOneId": this.state.playerOneId, "playerOneName": this.state.playerOneName, "playerSymbol": this.state.playerTwoSymbol  }
      } 
      if (this.props.player.playerTwoId) {
        player = {"playerTwoId": this.state.playerTwoId, "playerOneName": this.state.playerTwoName, "playerSymbol": this.state.playerTwoSymbol  }
      }
    }

    // console.log(playTurn(player, row, col, this.state, board));
    playTurn(player, row, col, this.state, board)
    
    // const hasWinner = checkWinner(board, player);

    // if (hasWinner == true) {
    //   this.setState({showDialog: true})
    // }
  
  }

  handleDialogClick(answer) {
    if (answer) {
      this.props.newGame();
    }

    this.setState({ showDialog: false });
  }

  handleDialogClose() {
    this.setState({ showDialog: false });
  }

  render() {
    // console.log(this.props)

    const { showDialog } = this.state;
    const { board, player, gameover, winner } = this.props;
    const draw = winner === 0;

    return (
      <div>
        <TitleBar updatePlayerInfo={this.updatePlayerState} />
        <Grid container spacing={5}>
          <Grid item xs={12} sm={9} md={7} >
            <Board board={board} onMove={this.handleBoardOnMove} currentPlayer={this.state} />
          </Grid> 
          <Grid item xs={12} sm={3} md={2}>
          <PlayerInfo player={player} />
          </Grid>      
        </Grid>
        <GameoverDialog
          open={showDialog}
          isDraw={draw}
          player={winner}
          onClick={this.handleDialogClick}
          onClose={this.handleDialogClose} />
      </div>
    );
  }
}

const { arrayOf, number, func, bool, object } = PropTypes;

// we want to list our props for validation even though 
// we are using react-redux to map our state and dispatch
// to the props of this Game component
Game.propTypes = {
  board: arrayOf(arrayOf(PropTypes.object)).isRequired,
  // board: arrayOf(arrayOf(number)).isRequired,
  player: number.isRequired,
  winner: number.isRequired,
  gameover: bool.isRequired,
  playTurn: func.isRequired,
  checkWinner: func.isRequired,
  newGame: func.isRequired,
  loadNewGame: func.isRequired
};

const mapStateToProps = (state) => {
  const { gameState } = state;

  return {
    board: gameState.board,
    player: gameState.player,
    gameover: gameState.gameover,
    winner: gameState.winner
  };
};

const mapDispatchToProps = {
  playTurn: gameOperations.playTurn,
  checkWinner: gameOperations.checkWinner,
  newGame: gameOperations.newGame,
  loadNewGame: gameOperations.loadNewGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);