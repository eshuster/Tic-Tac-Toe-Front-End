// views/components/Square.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';

const styles = (theme) => ({
  icon: {
    fontSize: '2em' // double the size of the square's font size
  }
});

const playerIcon = (player, currentPlayer) => {
  if(player['player_id'] != null) {
    if (player['player_id'] == currentPlayer.playerOneId){
      return currentPlayer.playerOneSymbol
    }
    if (player['player_id'] == currentPlayer.playerTwoId){
      return currentPlayer.playerTwoSymbol
    }
  }
  else {
    return '';
  };
}

const Square = ({ classes, player, currentPlayer }) => {
  return (
    <Icon className={classes.icon}>{playerIcon(player, currentPlayer)}</Icon>
  );
};

const { object, number } = PropTypes;

Square.propTypes = {
  classes: object.isRequired,
  player: number.isRequired,
  currentPlayer: object
};

export default withStyles(styles)(Square);