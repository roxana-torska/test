import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CustomInput from '../components/customInput/CustomInput';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import AppLayout from '../components/layouts/AppLayout';
import {
  Typography,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import styles from '../styles/common';
import classnames from 'classnames';
import Link from 'next/link';
import SvgIcon from '@material-ui/core/SvgIcon';
import validator from '../utils/validator';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { userAPI } from '../services/userAPI';
import notify from '../utils/notifier';
import { APP_URL } from '../utils/config';
import Router from 'next/router';
import { DishinMashroomIcon } from '../components/customIcon/customIcon';
import FooterActions from '../components/FooterActions/FooterActions';
import WindowResizeListener from 'react-window-size-listener';

function Transition(props) {
  return <Slide direction='down' {...props} />;
}
class RecoverPassword extends PureComponent {
  validators = {
    email: {
      required: { message: 'Please use your email' },
      email: true
    }
  };
  state = {
    email: '',
    emailError: false,
    emailErrorMessage: '',
    openDialog: false,
    winHeight: '100vh',
    winWidth: '100vw'
  };

  static getInitialProps({ store, isServer }) {
    return { isServer };
  }

  handleFieldChange = (name, value, notSetValue) => {
    notSetValue = notSetValue || false;
    const fieldError = validator(value, this.validators[name]);
    let state = null;
    if (fieldError.error === true) {
      state = {};
      state[`${name}Error`] = true;
      state[`${name}ErrorMessage`] = fieldError.errorMessage;
    } else if (notSetValue === false) {
      state = {};
      state[`${name}Error`] = false;
      state[`${name}ErrorMessage`] = '';
      state[name] = value;
    }
    if (state) {
      this.setState(state);
    }
    return fieldError.error;
  };

  validateForm = () => {
    const result = Object.keys(this.validators).map(field => {
      return this.handleFieldChange(field, this.state[field], true);
    });
    return !result.includes(true);
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.validateForm()) {
      const { email } = this.state;
      userAPI
        .recoverPassword({
          params: {
            email
          }
        })
        .then(response => {
          if (response.status.toUpperCase() === 'OK') {
            this.setState({ openDialog: true });
          } else {
            notify(response.error);
          }
        });
    } else {
      this.setState({ error: true });
    }
  };

  handleModelClose = () => {
    this.setState({ openDialog: false });
    Router.push(`/sign-in`);
  };

  render() {
    const { classes } = this.props;
    const {
      emailError,
      emailErrorMessage,
      openDialog,
      winHeight,
      winWidth
    } = this.state;
    let adjustHeightGridOne = 10;
    let adjustHeightGridThree = 8;
    let adjustHeightGridFive = 3;
    let adjustHeightGridSeven = 5;
    let adjustHeightGridNine = 2;
    let rootHeight = winHeight - 56;
    let minVisibleHeight = 308;
    if (winWidth <= 267) {
      minVisibleHeight = 267;
    }
    if (rootHeight < minVisibleHeight) {
      rootHeight = minVisibleHeight;
    } else {
      adjustHeightGridOne = ((rootHeight - minVisibleHeight) * 30) / 100;
      adjustHeightGridThree = ((rootHeight - minVisibleHeight) * 25) / 100;
      adjustHeightGridFive = ((rootHeight - minVisibleHeight) * 15) / 100;
      adjustHeightGridSeven = ((rootHeight - minVisibleHeight) * 20) / 100;
      adjustHeightGridNine = ((rootHeight - minVisibleHeight) * 10) / 100;
    }
    return (
      <AppLayout {...this.props}>
        <WindowResizeListener
          onResize={windowSize => {
            this.setState({ winHeight: windowSize.windowHeight });
          }}
        />
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Grid
            container
            direction='column'
            justify='space-between'
            alignItems='center'
            spacing={0}
            style={{
              margin: '0px',
              minHeight: `${rootHeight}px`
            }}
          >
            <Grid
              item
              style={{
                //backgroundColor: '#f0f0f0',
                height: `${adjustHeightGridOne}px`,
                width: '100%'
              }}
            />
            <Grid item className={classes.adjustHeightGridTwo}>
              <div
                className={classes.dihsinBackground}
                style={{ margin: '0 14px' }}
              >
                <DishinMashroomIcon className={classes.topBgIconRight} />
              </div>
              <div style={{ margin: '0 16px' }}>
                <Typography
                  variant='h1'
                  align='center'
                  className={classes.pageTitleRed}
                >
                  RECOVER PASSWORD
                </Typography>
                <div
                  className={classnames(
                    classes.footerLatoTextNormal,
                    classes.locationAddress
                  )}
                  style={{
                    margin: '0 26px',
                    textAlign: 'center',
                    marginTop: '7px'
                  }}
                >
                  Enter your e-mail to reset a password
                </div>
              </div>
            </Grid>
            <Grid
              item
              style={{
                //backgroundColor: '#f0f0f0',
                height: `${adjustHeightGridThree}px`,
                width: '100%'
              }}
            />
            <Grid item className={classes.adjustHeightGridFourRP}>
              <div style={{ margin: '0 42px' }}>
                <CustomInput
                  id='email'
                  label='Email'
                  error={emailError}
                  helperText={<span>{emailErrorMessage}</span>}
                  onChange={event =>
                    this.handleFieldChange('email', event.target.value)
                  }
                  fullwidth
                />
              </div>
            </Grid>
            <Grid
              item
              style={{
                // backgroundColor: '#f0f0f0',
                height: `${adjustHeightGridFive}px`,
                width: '100%'
              }}
            />
            <Grid item className={classes.adjustHeightGridSix}>
              <div style={{ margin: '0 82px' }}>
                <Button
                  size='medium'
                  className={classes.btnRaisedLightNormalRed}
                  fullWidth
                  onClick={this.handleSubmit}
                >
                  Reset
                </Button>
              </div>
            </Grid>
            <Grid
              item
              style={{
                //backgroundColor: '#f0f0f0',
                height: `${adjustHeightGridSeven}px`,
                width: '100%'
              }}
            />
            <Grid item className={classes.adjustHeightGridEight}>
              <FooterActions
                linkAction={
                  <div className={classes.footerLatoTextNormal}>
                    Wanna try one more time?{' '}
                    <a
                      href={`/sign-in`}
                      className={classnames(
                        classes.footerLatoTextBold,
                        classes.footerLink1
                      )}
                    >
                      Log in
                    </a>{' '}
                    to the app
                  </div>
                }
              />
            </Grid>
            <Grid
              item
              style={{
                // backgroundColor: '#f0f0f0',
                height: `${adjustHeightGridNine}px`,
                width: '100%'
              }}
            />
            <Grid item>
              <Dialog
                open={openDialog}
                keepMounted
                classes={{
                  root: classes.modelCenter,
                  paper: classes.recoverPasswordDialog
                }}
                TransitionComponent={Transition}
              >
                <DialogTitle
                  disableTypography
                  className={classes.recoverPasswordDialogTitle}
                >
                  Check your e-mail
                </DialogTitle>
                <DialogContent>
                  <DialogContentText className={classes.recoverPasswordText}>
                    We've send you a link to reset the new password.
                  </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                  <Button onClick={this.handleModelClose}>Close</Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </form>
      </AppLayout>
    );
  }
}

export default withStyles(styles)(RecoverPassword);
