const isWinner = (board, player) => {
  return winningPatterns.some(pattern => pattern.every(square => {
    const { r, c } = square;

    return board[r][c] === player;
  }));
};

/**
 * Checks to see if there's a draw on the board
 * NOTE: this function is meant to be called if isWinner returns false
 * @param {number[][]} board The game board
 */
const isDraw = (board) => {
  // if there are squares that have a 0 in them, that means the 
  // game is still in-progress
  const notDraw = board.some(row => row.some(col => typeof col === 'object' ));

  return !notDraw;
};

export {
  isWinner,
  isDraw
};