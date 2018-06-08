import * as types from './types';
import axios from 'axios';

const newGame = (board, playerOne, playerTwo) => ({
  type: types.NEW_GAME,
  'payload' : { board, playerOne, playerTwo }
});

const gameover = () => ({
  type: types.GAMEOVER
});

const movePlayer = (board) => ({
  type: types.MOVE,
  payload: board
});

const switchPlayer = player => ({
  type: types.PLAYER,
  payload: player
});

const winner = player => ({
  type: types.WINNER,
  payload: player
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const loadNewGame = (gameName, playerOneName, playerTwoName) => {
  return dispatch => { 
    // axios.post("http://tictactorevere.herokuapp.com/game/new_game", {'name': gameName})
    axios.post("http://127.0.0.1:5000/game/new_game", {'name': gameName})
    .then(function (response) {
      const newGameResponse = response;
      const gameId = newGameResponse.data[0].game_id;

      // axios.post("http://tictactorevere.herokuapp.com/player/create_players", {'playerOneName': playerOneName, 'playerTwoName': playerTwoName, 'gameId': gameId})      
      axios.post("http://127.0.0.1:5000/player/create_players", {'playerOneName': playerOneName, 'playerTwoName': playerTwoName, 'gameId': gameId})      
      .then(function (response) {
        const createPlayersResponse = response.data;
        const playerOne = {'playerOneId': createPlayersResponse.playerOneId, 'playerOneName' : createPlayersResponse.playerOneName }
        const playerTwo = {'playerTwoId': createPlayersResponse.playerTwoId, 'playerTwoName' : createPlayersResponse.playerTwoName}
        dispatch(newGame(newGameResponse.data, playerOne, playerTwo));
      })
      .catch(function (error) {
          console.log(error);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  };
}

export {
  newGame,
  gameover,
  movePlayer,
  switchPlayer,
  winner, 
  loadNewGame
};