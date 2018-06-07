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
			            value={this.props.name}
			            onChange={this.props.onChange} />
		            <TextInput
			            name="playerOneName"
			            value={this.props.name}
			            onChange={this.props.onChange} />
		            <TextInput
			            name="playerTwoName"
			            value={this.props.name}
			            onChange={this.props.onChange} />
		            <input
			            type="submit"
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
	onSave: PropTypes.func.isRequired
}

export default connect(null, null)(GameForm)