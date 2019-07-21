import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from '../../styles/common';
import { APP_URL } from '../../utils/config';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class UserMenu extends Component {
  handleSignOut = () => {
    window.location.href = `/sign-out`;
  };

  render() {
    const { open, userProfile, anchorEl, userMenuClose, classes } = this.props;
    return (
      <React.Fragment>
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={userMenuClose}
        >
          <MenuItem className={classes.listItem} onClick={userProfile}>
            Profile
          </MenuItem>
          <MenuItem className={classes.listItem} onClick={this.handleSignOut}>
            Sign out
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(UserMenu);
