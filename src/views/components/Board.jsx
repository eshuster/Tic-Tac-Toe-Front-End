import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Square from './Square.jsx';

const borderStyle = '1px solid black';
const styles = (theme) => ({
  // a square's dimension is 100x100px
  square: {
    height: 75,
    width: 75,
    lineHeight: '100px', // this is to center the icon in the square
    fontSize: '35px', // the size of our player's icon
    cursor: 'pointer'
  },
  // if a square is marked, we show the not allowed circle with a line through it
  marked: { cursor: 'not-allowed' },
  // a rows should have its content centered
  row: { textAlign: 'center' },
  // these styles make up the border of the game cross pattern
  '0_0': { borderBottom: borderStyle },
  '0_1': { borderLeft: borderStyle, borderBottom: borderStyle },
  '0_2': { borderLeft: borderStyle, borderBottom: borderStyle },
  '0_3': { borderLeft: borderStyle, borderBottom: borderStyle },
  '0_4': { borderLeft: borderStyle, borderBottom: borderStyle },
  '0_5': { borderLeft: borderStyle, borderBottom: borderStyle },
  '0_6': { borderLeft: borderStyle, borderBottom: borderStyle },
  '0_7': { borderLeft: borderStyle, borderBottom: borderStyle },
  '0_8': { borderLeft: borderStyle, borderBottom: borderStyle },
  '1_0': { borderBottom: borderStyle },
  '1_1': { borderLeft: borderStyle, borderBottom: borderStyle },
  '1_2': { borderLeft: borderStyle, borderBottom: borderStyle },
  '1_3': { borderLeft: borderStyle, borderBottom: borderStyle },
  '1_4': { borderLeft: borderStyle, borderBottom: borderStyle },
  '1_5': { borderLeft: borderStyle, borderBottom: borderStyle },
  '1_6': { borderLeft: borderStyle, borderBottom: borderStyle },
  '1_7': { borderLeft: borderStyle, borderBottom: borderStyle },
  '1_8': { borderLeft: borderStyle, borderBottom: borderStyle },
  '2_0': { borderBottom: borderStyle },
  '2_1': { borderLeft: borderStyle, borderBottom: borderStyle },
  '2_2': { borderLeft: borderStyle, borderBottom: borderStyle },
  '2_3': { borderLeft: borderStyle, borderBottom: borderStyle },
  '2_4': { borderLeft: borderStyle, borderBottom: borderStyle },
  '2_5': { borderLeft: borderStyle, borderBottom: borderStyle },
  '2_6': { borderLeft: borderStyle, borderBottom: borderStyle },
  '2_7': { borderLeft: borderStyle, borderBottom: borderStyle },
  '2_8': { borderLeft: borderStyle, borderBottom: borderStyle },
  '3_0': { borderBottom: borderStyle },
  '3_1': { borderLeft: borderStyle, borderBottom: borderStyle },
  '3_2': { borderLeft: borderStyle, borderBottom: borderStyle },
  '3_3': { borderLeft: borderStyle, borderBottom: borderStyle },
  '3_4': { borderLeft: borderStyle, borderBottom: borderStyle },
  '3_5': { borderLeft: borderStyle, borderBottom: borderStyle },
  '3_6': { borderLeft: borderStyle, borderBottom: borderStyle },
  '3_7': { borderLeft: borderStyle, borderBottom: borderStyle },
  '3_8': { borderLeft: borderStyle, borderBottom: borderStyle },
  '4_0': { borderBottom: borderStyle },
  '4_1': { borderLeft: borderStyle, borderBottom: borderStyle },
  '4_2': { borderLeft: borderStyle, borderBottom: borderStyle },
  '4_3': { borderLeft: borderStyle, borderBottom: borderStyle },
  '4_4': { borderLeft: borderStyle, borderBottom: borderStyle },
  '4_5': { borderLeft: borderStyle, borderBottom: borderStyle },
  '4_6': { borderLeft: borderStyle, borderBottom: borderStyle },
  '4_7': { borderLeft: borderStyle, borderBottom: borderStyle },
  '4_8': { borderLeft: borderStyle, borderBottom: borderStyle },
  '5_0': { borderBottom: borderStyle },
  '5_1': { borderLeft: borderStyle, borderBottom: borderStyle },
  '5_2': { borderLeft: borderStyle, borderBottom: borderStyle },
  '5_3': { borderLeft: borderStyle, borderBottom: borderStyle },
  '5_4': { borderLeft: borderStyle, borderBottom: borderStyle },
  '5_5': { borderLeft: borderStyle, borderBottom: borderStyle },
  '5_6': { borderLeft: borderStyle, borderBottom: borderStyle },
  '5_7': { borderLeft: borderStyle, borderBottom: borderStyle },
  '5_8': { borderLeft: borderStyle, borderBottom: borderStyle },
  '6_0': { borderBottom: borderStyle },
  '6_1': { borderLeft: borderStyle, borderBottom: borderStyle },
  '6_2': { borderLeft: borderStyle, borderBottom: borderStyle },
  '6_3': { borderLeft: borderStyle, borderBottom: borderStyle },
  '6_4': { borderLeft: borderStyle, borderBottom: borderStyle },
  '6_5': { borderLeft: borderStyle, borderBottom: borderStyle },
  '6_6': { borderLeft: borderStyle, borderBottom: borderStyle },
  '6_7': { borderLeft: borderStyle, borderBottom: borderStyle },
  '6_8': { borderLeft: borderStyle, borderBottom: borderStyle },
  '7_0': { borderBottom: borderStyle },
  '7_1': { borderLeft: borderStyle, borderBottom: borderStyle },
  '7_2': { borderLeft: borderStyle, borderBottom: borderStyle },
  '7_3': { borderLeft: borderStyle, borderBottom: borderStyle },
  '7_4': { borderLeft: borderStyle, borderBottom: borderStyle },
  '7_5': { borderLeft: borderStyle, borderBottom: borderStyle },
  '7_6': { borderLeft: borderStyle, borderBottom: borderStyle },
  '7_7': { borderLeft: borderStyle, borderBottom: borderStyle },
  '7_8': { borderLeft: borderStyle, borderBottom: borderStyle },
  // '8_0': { borderBottom: borderStyle },
  '8_1': { borderLeft: borderStyle },
  '8_2': { borderLeft: borderStyle },
  '8_3': { borderLeft: borderStyle },
  '8_4': { borderLeft: borderStyle },
  '8_5': { borderLeft: borderStyle },
  '8_6': { borderLeft: borderStyle },
  '8_7': { borderLeft: borderStyle },
  '8_8': { borderLeft: borderStyle },
 
});

const Board = ({ classes, board, onMove, currentPlayer }) => {
  return (
    <Grid container>
      {board.map((row, rIdx) => (
        <Grid key={rIdx} item xs={25} className={classes.row}>
          <Grid container justify="center">
            {row.map((col, cIdx) => {
              const border = classes[`${rIdx}_${cIdx}`] || '';
              const marked = typeof col == 'object' ? classes.marked : '';
        
              return (
                <Grid
                  key={cIdx}
                  item
                  className={classnames(classes.square, border, marked)}
                  onClick={() => onMove({ row: rIdx, col: cIdx})}>
                  {/* 
                      we have two options here, we can add the click event to the grid item or we can 
                      or we can pass it down to the Square to call when it is clicked on.  
                      if we pass it down, we will need to update the square to accept the onMove event 
                      and give the coordinates that it resides in
                    */}
                  <Square player={col} currentPlayer={currentPlayer} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

const { arrayOf, number, object, func } = PropTypes;

Board.propTypes = {
  classes: object.isRequired,
  board: arrayOf(arrayOf(object)).isRequired,
  onMove: func.isRequired,
  currentPlayer: object
};

export default withStyles(styles)(Board);