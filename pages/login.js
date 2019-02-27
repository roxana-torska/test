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
import { APP_URL } from '../utils/config';
import SocialLinks from '../components/common/SocialLinks';

class Login extends PureComponent {
  validators = {
    email: {
      required: { message: 'Please use your email' },
      email: true
    },
    password: {
      required: { message: 'Password required' }
    }
  };
  state = {
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    emailErrorMessage: '',
    passwordErrorMessage: ''
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
      const { email, password } = this.state;
      userAPI
        .login({
          params: {
            email,
            password
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
      passwordError,
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
              <CustomInput
                id='email'
                label='Email'
                error={emailError}
                helperText={<span>{emailErrorMessage}</span>}
                onChange={event =>
                  this.handleFieldChange('email', event.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ margin: '0px 26px' }}>
              <CustomInput
                id='password'
                label='Password'
                type='password'
                error={passwordError}
                helperText={<span>{passwordErrorMessage}</span>}
                onChange={event =>
                  this.handleFieldChange('password', event.target.value)
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
                <Link href={`${APP_URL}/sign-up`}>
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
            </Grid>
          </Grid>
        </form>
      </AppLayout>
    );
  }
}

export default withStyles(styles)(Login);
