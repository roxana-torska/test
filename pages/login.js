import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AppLayout from '../components/layouts/AppLayout';
import { Typography } from '@material-ui/core';
import styles from '../styles/common';
import classnames from 'classnames';
import Link from 'next/link';
import SvgIcon from '@material-ui/core/SvgIcon';
import actions from '../redux/user/actions';
import validator from '../utils/validator';
import Router from 'next/router';
import { userAPI } from '../services/userAPI';
import notify from '../utils/notifier';

class Login extends PureComponent {
  state = {
    email: '',
    password: '',
    emailError: false,
    passWordError: false,
    emailErrorMessage: '',
    passwordErrorMessage: ''
  };

  static getInitialProps({ store, isServer }) {

    return { isServer };
  }

  handleFieldChange = (name, value, validateValue) => {
    const fieldError = validator(value, validateValue);
    if (fieldError.error === true) {
      if (validateValue.email) {
        this.setState({
          emailError: true,
          emailErrorMessage: fieldError.errorMessage
        });
      }
      if (validateValue.password) {
        this.setState({
          passWordError: true,
          passwordErrorMessage: fieldError.errorMessage
        });
      }
    } else {
      this.setState({
        emailError: false,
        passWordError: false,
        emailErrorMessage: '',
        passwordErrorMessage: ''
      });
      const newState = {};
      newState[name] = value;
      this.setState(newState);
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      userAPI.login({
        params: {
          email,
          password
        }
      }).then(response => {
        if (response.status.toUpperCase() === 'OK') {
          Router.push(`/auth/callback/${response.data.token}`);
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
      passWordError,
      emailErrorMessage,
      passwordErrorMessage
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
                LOGIN
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ margin: '0px 26px' }}>
              <TextField
                id='email'
                label='Email'
                className={classes.inputField}
                margin='normal'
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel,
                    focused: classes.inputLabelFocused
                  }
                }}
                InputProps={{
                  classes: { underline: classes.inputUnderline }
                }}
                error={emailError}
                helperText={<span>{emailErrorMessage}</span>}
                onChange={event =>
                  this.handleFieldChange('email', event.target.value, {
                    require: 'Please enter your email',
                    email: true
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ margin: '0px 26px' }}>
              <TextField
                id='password'
                label='Password'
                type='password'
                className={classes.inputField}
                margin='normal'
                InputProps={{
                  classes: { underline: classes.inputUnderline }
                }}
                fullWidth
                error={passWordError}
                helperText={<span>{passwordErrorMessage}</span>}
                fullWidth
                onChange={event =>
                  this.handleFieldChange('password', event.target.value, {
                    require: true,
                    password: true,
                    equalTo: ''
                  })
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
                Log In
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
                New User?{' '}
                <Link href='/sign-up'>
                  <a
                    className={classnames(
                      classes.footerLatoTextBold,
                      classes.footerLink1
                    )}
                  >
                    Sign Up
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
                <SvgIcon className={classes.socialIcon} viewBox='0 0 40 40'>
                  <path
                    fill='#3B5998'
                    d='M20 0C8.972 0 0 8.972 0 20c0 11.027 8.972 20 20 20 11.027 0 20-8.973 20-20C40 8.972 31.029 0 20 0zm4.974 20.704H21.72v11.598h-4.822V20.704h-2.291v-4.099h2.291v-2.651c0-1.899.903-4.866 4.866-4.866l3.573.014v3.979h-2.593c-.422 0-1.022.21-1.022 1.116v2.409h3.673l-.421 4.098z'
                  />
                </SvgIcon>
                <span style={{ margin: '0px 20px' }} />
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
                <Link href='#'>
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
            </Grid>
          </Grid>
        </form>
      </AppLayout>
    );
  }
}

export default withStyles(styles)(Login);
