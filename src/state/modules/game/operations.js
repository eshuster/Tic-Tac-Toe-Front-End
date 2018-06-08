import { newGame, gameover, switchPlayer, winner, movePlayer, loadNewGame } from './actions';
import { isWinner, isDraw } from '../../utils/game';
import axios from 'axios';

const checkWinner = (board, player) => (dispatch) => {
  let hasWinner = true;

  if (isWinner(board, player)) {
    dispatch(winner(player));
    dispatch(gameover());

  } else if (isDraw(board)) {
    dispatch(winner(0));
    dispatch(gameover());
  } else {
    hasWinner = false;
  }

  return hasWinner;
};

/**
 * When a player plays a turn we need to mark that spot on the board.  We then need to 
 * switch to the next player
 * @param {number} player The current player
 * @param {number} row The row on the board
 * @param {number} col The column on the board
 */
const playTurn = (player, row, col, playerInfo, board) => (dispatch) => {

  if (board[row][col]['player_id'] == null) {

    let nextPlayer;

    if (player.playerOneId == playerInfo.playerOneId) {
        nextPlayer = {'playerTwoId': playerInfo.playerTwoId, 'playerTwoName': playerInfo.playerTwoName};
        board[row][col]['player_id'] = player.playerOneId;

        // axios.post('http://tictactorevere.herokuapp.com/board/select_position', {'player_id': player.playerOneId, 'cell_id': board[row][col]['cell_id'], 'board_id': board[row][col]['board_id']})
        axios.post('http://127.0.0.1:5000/board/select_position', {'player_id': player.playerOneId, 'cell_id': board[row][col]['cell_id'], 'board_id': board[row][col]['board_id']})
        .then(function(response){
          console.log(response)
          dispatch(movePlayer(board));

          if (response.data.winner == true){
            console.log("Winner is Player ONE")
            dispatch(winner(player.playerOneId))
            dispatch(gameover());
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
    if (player.playerTwoId == playerInfo.playerTwoId)  
    {
        nextPlayer = {'playerOneId': playerInfo.playerOneId, 'playerOneName': playerInfo.playerOneName};
        board[row][col]['player_id'] = player.playerTwoId;

        // axios.post('http://tictactorevere.herokuapp.com', {'player_id': player.playerTwoId, 'cell_id': board[row][col]['cell_id'], 'board_id': board[row][col]['board_id']})
        axios.post('http://127.0.0.1:5000/board/select_position', {'player_id': player.playerTwoId, 'cell_id': board[row][col]['cell_id'], 'board_id': board[row][col]['board_id']})
        .then(function(response){
         console.log(response)
          dispatch(movePlayer(board));

          if (response.data.winner == true){
            console.log("Winner is Player Two")
            dispatch(winner(player.playerTwoId))
            dispatch(gameover());
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
    
    dispatch(switchPlayer(nextPlayer));
  }
};

export {
  newGame,
  loadNewGame,
  checkWinner,
  playTurn
};