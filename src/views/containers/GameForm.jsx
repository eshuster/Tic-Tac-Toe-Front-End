import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { gameOperations } from '../../state/modules/game';
import TextInput from '../components/TextInput.jsx';

class GameForm extends Component {
	constructor(props, context) {
		super(props, context);
  	}

	render() {
		return (
      		<div>
	        	<form>
					<TextInput
			            name="gameName"
			            label="Game Name"
			            value={this.props.name}
			            onChange={this.props.onChange} />
		            <TextInput
			            name="playerOneName"
			            label="Player One Name"
			            value={this.props.name}
			            onChange={this.props.onChange} />
		            <TextInput
			            name="playerTwoName"
			            label="Player Two Name"
			            value={this.props.name}
			            onChange={this.props.onChange} />
		            <input
			            type="submit"
			            value="New Game"
			            className="btn btn-primary"
			            onClick={this.props.onSave} />
	            </form>
        	</div>
        )
	}
}

const { string } = PropTypes;

GameForm.propTypes = {
	onChange: PropTypes.func,
	onSave: PropTypes.func.isRequired,
	gameName: PropTypes.string,
	playerOneName: PropTypes.string,
	playerTwoName: PropTypes.string
}

const mapStateToProps = (state) => {
  const { gameState } = state;

  return {
    gameName: gameState.gameName,
    playerOneName: gameState.playerOneName,
    playerTwoName: gameState.playerTwoName,
  };
};



export default connect(mapStateToProps)(GameForm)