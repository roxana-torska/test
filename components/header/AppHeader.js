import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Grid, IconButton,MenuIcon,Typography,EditIcon,SaveIcon,MoreVertIcon } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import styles from '../../styles/common';

function AppHeader(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar  position="static"  elevation={0} color='white'>
        <Toolbar>
        <div className={classes.topBarIcon}>
         <img src='/static/icons/topBar-icon-search.svg'  />
      </div>
          <div className={classes.topBarLogoContainer}>
            <img className={classes.topBarLogo}  src='/static/imgs/logo.svg' />
          </div>
       
      <div className={classes.topBarIcon}>
         <img src='/static/icons/topBar-icon-hamburger.svg'  />
      </div>
        </Toolbar>
      </AppBar>


      <hr className={classes.headerHr}/>
    </div>

  );
  
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppHeader);
