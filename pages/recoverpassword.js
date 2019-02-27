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
import { appUrl } from '../utils/config';


function Transition(props) {
  return <Slide direction='down' {...props} />;
}
class RecoverPassword extends PureComponent {
  validators = {
    email: {
      required: { message: 'Please use your email' },
      email: true
    }
  }
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
  }

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
            Router.push(`/auth/callback?token=${response.data.token}`);
          } else {
            notify(response.error);
          }
        });
    } else {
      this.setState({ error: true });
    }
  };
  
  render() {
    const { classes } = this.props;
    const {
      emailError,
      emailErrorMessage
    } = this.state;
  
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
                <Link href={`${appUrl}/sign-in`}>
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
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{ margin: '0px 26px 3%' }}
            >
              <div style={{ margin: '23px 0px 35px' }}>
                <Link href={`${appUrl}/auth/facebook`}>
                  <SvgIcon className={classes.socialIcon} viewBox='0 0 40 40'>
                    <path
                      fill='#3B5998'
                      d='M20 0C8.972 0 0 8.972 0 20c0 11.027 8.972 20 20 20 11.027 0 20-8.973 20-20C40 8.972 31.029 0 20 0zm4.974 20.704H21.72v11.598h-4.822V20.704h-2.291v-4.099h2.291v-2.651c0-1.899.903-4.866 4.866-4.866l3.573.014v3.979h-2.593c-.422 0-1.022.21-1.022 1.116v2.409h3.673l-.421 4.098z'
                    />
                  </SvgIcon>
                </Link>
                <span style={{ margin: '0px 10px' }} />
                <Link href={`${appUrl}/auth/instagram`}>
                  <SvgIcon className={classes.socialIcon} viewBox='0 0 40 40'>
                    <path
                      fill='#E1306C'
                      d='M25.96 10.643H14.04a3.455 3.455 0 0 0-3.451 3.45v11.922a3.455 3.455 0 0 0 3.45 3.452h11.923a3.455 3.455 0 0 0 3.451-3.451V14.093a3.455 3.455 0 0 0-3.451-3.451zM20 26.252a6.204 6.204 0 0 1-6.197-6.197A6.204 6.204 0 0 1 20 13.858a6.204 6.204 0 0 1 6.197 6.197A6.205 6.205 0 0 1 20 26.252zm6.396-11.113a1.468 1.468 0 0 1-1.466-1.466c0-.808.657-1.466 1.466-1.466.809 0 1.466.658 1.466 1.466 0 .808-.657 1.466-1.466 1.466z'
                    />
                    <path
                      fill='#E1306C'
                      d='M20 16.476a3.583 3.583 0 0 0-3.578 3.577A3.583 3.583 0 0 0 20 23.633a3.582 3.582 0 0 0 3.578-3.58A3.582 3.582 0 0 0 20 16.476z'
                    />
                    <path
                      fill='#E1306C'
                      d='M20 0C8.955 0 0 8.955 0 20s8.955 20 20 20 20-8.955 20-20S31.045 0 20 0zm12.03 26.015a6.076 6.076 0 0 1-6.07 6.07H14.04a6.076 6.076 0 0 1-6.07-6.07V14.093a6.077 6.077 0 0 1 6.07-6.07h11.92a6.076 6.076 0 0 1 6.07 6.07v11.922z'
                    />
                  </SvgIcon>
                </Link>
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
              style={{ margin: '0px 26px 11px' }}
            >
              <div className={classes.footerLatoTextNormal}>
                Forgot Password?{' '}
                <Link href={`${appUrl}/recover-password`}>
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
                    We send you a link to reset password
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
