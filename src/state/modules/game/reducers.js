import { combineReducers } from 'redux';

import * as types from './types';
import * as actions from './actions';
import initialState from './initialState';


import { newGame, gameover, switchPlayer, winner, movePlayer, loadNewGame } from './actions';

const emptyBoard = () => [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const boardReducer = (state = [[]], action) => {
  switch (action.type) {
    case types.NEW_GAME:
      let board = emptyBoard();
      let gameBoard= [];
      for (var cellIndex = 0; cellIndex < action.payload.board.length; cellIndex++) {
        let cell = action.payload.board[cellIndex];
        board[cellIndex] = cell
      };

      while (board.length > 0) {
        let row = board.splice(0, 9);
        gameBoard.push(row);
      }

      return gameBoard
    case types.MOVE:
      return action.payload;
    default:
      return state;
  }
};

const gameoverReducer = (state = false, action) => {
  switch (action.type) {
    case types.NEW_GAME:
      return false;
    case types.GAMEOVER:
      return true;
    case types.WINNER:
      return true;
    default:
      return state;
  }
};

const gameFormReducer = (state = initialState.playerInfo, action) => {
  switch (action.type) {
    case types.NEW_GAME_AND_PLAYER:
      return state;
    default:
      return state;
  }
};

const winnerReducer = (state = -1, action) => {
  switch (action.type) {
    case types.WINNER:
      return action.payload;
    case types.NEW_GAME:
      return -1;
    default:
      return state;
  }
};

const playerReducer = (state = 0, action) => {
  switch (action.type) {
    case types.PLAYER:
      return action.payload;
    case types.NEW_GAME:
      initialState.playerInfo.playerOneId = action.payload.playerOne.playerOneId
      initialState.playerInfo.playerOneName = action.payload.playerOne.playerOneName
      initialState.playerInfo.playerTwoId =  action.payload.playerTwo.playerTwoId
      initialState.playerInfo.playerTwoName = action.payload.playerTwo.playerTwoName
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  board: boardReducer,
  gameover: gameoverReducer,
  winner: winnerReducer,
  player: playerReducer,
  gameForm: gameFormReducer

});