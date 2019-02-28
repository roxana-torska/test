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
import Router from 'next/router';
import { APP_URL } from '../utils/config';
import { userAPI } from '../services/userAPI';
import SocialLinks from '../components/common/SocialLinks';

class ResetPassword extends PureComponent {
  getFieldValue = name => {
    return this.state[name] || '';
  };
  validators = {
    password: {
      required: { message: 'Password required' },
      minValue: { length: 8 },
      equalsTo: {
        value: this.getFieldValue.bind(this, 'confirmPassword'),
        message: `The confirm password doesn't match with the given password`
      }
    },
    confirmPassword: {
      required: { message: 'Confirm Password required' },
      minValue: { length: 8 },
      equalsTo: {
        value: this.getFieldValue.bind(this, 'password'),
        message: `The confirm password doesn't match with the given password`
      }
    }
  };
  state = {
    password: '',
    confirmPassword: '',
    passwordError: false,
    confirmPasswordError: false,
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
      const { password, confirmPassword } = this.state;
      const { token } = this.props;
      userAPI
        .resetPassword({
          params: {
            password,
            confirmPassword,
            token
          }
        })
        .then(response => {
          if (response.status.toUpperCase() === 'OK') {
            notify(response.info);
            Router.push(`/sign-in`);
          } else {
            notify(response.error);
          }
        });
    } else {
      this.setState({ error: true });
    }
  };

  static async getInitialProps({ store, isServer, query }) {
    const { token } = query;
    return { token };
  }

  render() {
    const { classes, token } = this.props;
    const {
      passwordError,
      confirmPasswordError,
      passwordErrorMessage,
      confirmPasswordErrorMessage
    } = this.state;

    return (
      <AppLayout {...this.props}>
        <form className={classes.container} noValidate autoComplete='off'>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={0}
            style={{ margin: '0px 16px' }}
          >
            {!token ? (
              <h1>Invalid Token</h1>
            ) : (
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography
                    variant='h1'
                    align='center'
                    className={classes.pageTitleRed}
                  >
                    Reset Password
                  </Typography>
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
                      this.handleFieldChange(
                        'confirmPassword',
                        event.target.value
                      )
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
                    Reset
                  </Button>
                </Grid>
              </React.Fragment>
            )}
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

export default withStyles(styles)(ResetPassword);
