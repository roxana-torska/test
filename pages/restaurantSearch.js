import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CustomInput from '../components/customInput/CustomInput';
import Button from '@material-ui/core/Button';
import AppLayout from '../components/layouts/AppLayout';
import { Typography } from '@material-ui/core';
import styles from '../styles/common';
import classnames from 'classnames';
import Link from 'next/link';
import SvgIcon from '@material-ui/core/SvgIcon';
import validator from '../utils/validator';
import Router from 'next/router';
import { userAPI } from '../services/userAPI';
import notify from '../utils/notifier';
import { appUrl } from '../utils/config';

class RestaurantSearch extends PureComponent {
  state = {
    location: ''
  };

  static getInitialProps({ store, isServer }) {
    return { isServer };
  }

  handleFieldChange = (name, value) => {
    console.log('value', value);
  };

  handleSubmit = evt => {
    evt.preventDefault();
  };

  render() {
    const { classes } = this.props;

    return (
      <AppLayout {...this.props}>
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={0}
            style={{ margin: '0px 16px' }}
          >
            <Grid item xs={12}>
              <Typography
                variant='h1'
                align='center'
                className={classes.pageTitleRed}
              >
                WELCOME TO DISHIN!
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ margin: '0px 26px' }}>
              <CustomInput
                id='location'
                label='location'
                onChange={event =>
                  this.handleFieldChange('location', event.target.value)
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              className={classes.btnContainer}
            >
              <Button
                size='medium'
                className={classes.btnRaisedLightNormalRed}
                fullWidth
                onClick={this.handleSubmit}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </AppLayout>
    );
  }
}

export default withStyles(styles)(RestaurantSearch);
