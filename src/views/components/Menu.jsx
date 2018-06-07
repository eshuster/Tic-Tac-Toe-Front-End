import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import GameForm from '../containers/GameForm.jsx';

const Menu = ({ open, onItemClick, onClose, onChange, onSave }) => {

  return (
    <Drawer open={open} onClose={onClose} anchor="top">
      <List>
        <ListItem >
          <ListItemIcon>
            <Icon>fiber_new</Icon>
          </ListItemIcon>
          <ListItemText>New game</ListItemText>
        </ListItem>
        <GameForm onChange={onChange} onSave={onSave}/>
      </List>
    </Drawer>
   
  );
};

const { func, bool } = PropTypes;

Menu.propTypes = {
  open: bool.isRequired,
  onItemClick: func.isRequired,
  onClose: func.isRequired,
  onChange: func,
  onSave: PropTypes.func.isRequired
};

export default Menu;