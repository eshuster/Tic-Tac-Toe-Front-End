import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import Menu from '../components/Menu.jsx';


import { gameOperations } from '../../state/modules/game';

const styles = () => ({
    menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class TitleBar extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = { 
      menuOpen: true,
      gameName: '',
      playerOneId: '',
      playerOneName: '',
      playerTwoId: '',
      playerTwoName: ''
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleNewGameClick = this.handleNewGameClick.bind(this);
    this.updateName = this.updateName.bind(this);
    this.newGameAndPlayers = this.newGameAndPlayers.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
  }

  updateName(event) {
    const field = event.target.name;
    let _name = event.target.value;

    if (field == "gameName") {
      this.setState({gameName: _name});
    }
    else if (field == "playerOneName") {
      this.setState({playerOneName: _name});
    }
    else {
      this.setState({playerTwoName: _name});
    }
    
  }

  newGameAndPlayers(event) {
    event.preventDefault();
    this.props.loadNewGame(this.state.gameName, this.state.playerOneName, this.state.playerTwoName);
    this.setState({ menuOpen: false });
  }

  handleMenuClick() {
    this.setState({ menuOpen: true });
  }

  handleMenuClose() {
    this.setState({ menuOpen: false });
  }

  handleNewGameClick(itemKey, name) {
    console.log(itemKey)
    console.log(name)
    if (itemKey === 'new') {
      this.props.loadNewGame();
    }

    this.setState({ menuOpen: false });
  }

  render() {
    const { classes } = this.props;
    const { menuOpen } = this.state;

    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleMenuClick}>
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="title" color="inherit">
              Tic Tac Toe
          </Typography>
          </Toolbar>
        </AppBar>
        <Menu open={menuOpen} onClose={this.handleMenuClose} onChange={this.updateName} onSave={this.newGameAndPlayers} />
      </div>
    );
  }
}

const { object, func } = PropTypes;

TitleBar.propTypes = {
  classes: object.isRequired,
  newGame: func.isRequired,
  loadNewGame: func.isRequired
};

const mapDispatchToProps = {
  newGame: gameOperations.newGame,
  loadNewGame: gameOperations.loadNewGame
};

const styledTitleBar = withStyles(styles)(TitleBar);

export default connect(null, mapDispatchToProps)(styledTitleBar);