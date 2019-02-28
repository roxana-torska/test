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
import SocialLinks from '../components/common/SocialLinks';

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
    openDialog: false
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
    Router.push(`${APP_URL}/sign-in`);
  };

  render() {
    const { classes } = this.props;
    const { emailError, emailErrorMessage, openDialog } = this.state;

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
                RECOVER PASSWORD
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{ margin: '0px 26px  11px' }}
            >
              <div className={classes.footerLatoTextNormal}>
                Enter your e-mail to reset a password
              </div>
            </Grid>
            <Grid item xs={12} style={{ margin: '0px 26px' }}>
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
                Reset
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={0}
            style={{ margin: '0px 16px' }}
          >
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{ margin: '0px 26px  11px' }}
            >
              <div className={classes.footerLatoTextNormal}>
                Wanna try one more time?{' '}
                <Link href={`${APP_URL}/sign-in`}>
                  <a
                    className={classnames(
                      classes.footerLatoTextBold,
                      classes.footerLink1
                    )}
                  >
                    Log in
                  </a>
                </Link>{' '}
                to the app
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{ margin: '0px 26px  11px' }}
            >
              <div className={classes.footerLatoTextNormal}>
                Or Connect with
              </div>
            </Grid>
            <SocialLinks />
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{ margin: '0px 26px 11px' }}
            >
              <div className={classes.footerLatoTextNormal}>
                Forgot Password?{' '}
                <Link href={`${APP_URL}/recover-password`}>
                  <a
                    className={classnames(
                      classes.footerLatoTextBold,
                      classes.footerLink1
                    )}
                  >
                    Recover Password
                  </a>
                </Link>
              </div>
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
