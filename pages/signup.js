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
import notify from '../utils/notifier';
import { userAPI } from '../services/userAPI';
import Router from 'next/router';
import { APP_URL } from '../utils/config';
import SocialLinks from '../components/common/SocialLinks';

class SignUp extends PureComponent {
  getFieldValue = name => {
    return this.state[name] || '';
  };
  validators = {
    email: {
      required: { message: 'Please use your email' },
      email: true
    },
    password: {
      required: { message: 'Password required' },
      minValue: { length: 8 },
      equalsTo: {
        value: this.getFieldValue.bind(this, 'confirmPassword'),
        message: `The confirm password doesn't match with the given password`
      }
    },
    confirmPassword: {
      required: { message: 'Password required' },
      minValue: { length: 8 },
      equalsTo: {
        value: this.getFieldValue.bind(this, 'password'),
        message: `The confirm password doesn't match with the given password`
      }
    }
  };
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    emailErrorMessage: '',
    passwordErrorMessage: '',
    confirmPasswordErrorMessage: ''
  };

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
      const { email, password, confirmPassword } = this.state;
      userAPI
        .signUp({
          params: {
            email,
            password,
            confirmPassword
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

  static getInitialProps({ store, isServer }) {
    return {};
  }

  render() {
    const { classes } = this.props;
    const {
      emailError,
      passwordError,
      confirmPasswordError,
      emailErrorMessage,
      passwordErrorMessage,
      confirmPasswordErrorMessage
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
                SIGN UP
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
                label='Set up a password'
                type='password'
                error={passwordError}
                helperText={<span>{passwordErrorMessage}</span>}
                onChange={event =>
                  this.handleFieldChange('password', event.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} style={{ margin: '0px 26px' }}>
              <CustomInput
                id='confirmPassword'
                label='Confirm Password'
                type='password'
                error={confirmPasswordError}
                helperText={<span>{confirmPasswordErrorMessage}</span>}
                onChange={event =>
                  this.handleFieldChange('confirmPassword', event.target.value)
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
                Sign Up
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
                Already in Dishin?{' '}
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
            </Grid>
          </Grid>
        </form>
      </AppLayout>
    );
  }
}

export default withStyles(styles)(SignUp);
