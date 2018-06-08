// views/components/PlayerInfo.jsx

import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';

const PlayerInfo = ({ player, gameover }) => {
    // console.log(player)
    let playerId;
    let playerName;

    if (player.playerOneId) {
      playerId = player.playerOneId
      playerName = player.playerOneName
    }
    if (player.playerTwoId) {
      playerId = player.playerTwoId
      playerName = player.playerTwoName
    }

  return (
    <div>
      <Typography variant="headline">
        {gameover && "Gameover!"}
        {!gameover && `Player Id: ${playerId}`}
        <br />
        {!gameover && `Player Name: ${playerName}`}
      </Typography>
    </div>
  );
};

const { number, bool, object } = PropTypes;

PlayerInfo.propTypes = {
  player: number.isRequired,
  playerInfo: object.isRequired,
  gameover: bool.isRequired
};

export default PlayerInfo;