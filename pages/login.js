import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CustomInput from '../components/customInput/CustomInput';
import Button from '@material-ui/core/Button';
import AppLayout from '../components/layouts/AppLayout';
import { Typography } from '@material-ui/core';
import styles from '../styles/common';
import classnames from 'classnames';
import validator from '../utils/validator';
import { userAPI } from '../services/userAPI';
import notify from '../utils/notifier';
import { APP_URL } from '../utils/config';
import FooterActions from '../components/common/FooterActions';
import WindowResizeListener from 'react-window-size-listener';
import { DishinMashroomIcon } from '../components/customIcon/customIcon';

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
    passwordErrorMessage: '',
    winHeight: '100vh',
    winWidth: '100vw'
  };

  static getInitialProps({ store, isServer, query }) {
    let redirectUrl = query && query.redirect ? query.redirect : '';
    return { isServer, redirectUrl };
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
    const { redirectUrl } = this.props;
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
            let url = `/auth/callback?token=${
              response.data.token
            }&redirect=${escape(redirectUrl)}`;
            window.location.href = url;
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
      passwordErrorMessage,
      winHeight,
      winWidth
    } = this.state;
    let adjustHeightGridOne = 10;
    let adjustHeightGridThree = 8;
    let adjustHeightGridFive = 3;
    let adjustHeightGridSeven = 5;
    let adjustHeightGridNine = 2;
    let rootHeight = winHeight - 56;
    let minVisibleHeight = 361;
    if (winWidth <= 312) {
      minVisibleHeight = 312;
    }
    if (rootHeight < minVisibleHeight) {
      rootHeight = minVisibleHeight;
    } else {
      adjustHeightGridOne = ((rootHeight - minVisibleHeight) * 30) / 100;
      adjustHeightGridThree = ((rootHeight - minVisibleHeight) * 15) / 100;
      adjustHeightGridFive = ((rootHeight - minVisibleHeight) * 20) / 100;
      adjustHeightGridSeven = ((rootHeight - minVisibleHeight) * 25) / 100;
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
                // backgroundColor: '#999',
                height: `${adjustHeightGridOne}px`,
                width: '100%'
              }}
            />
            <Grid item className={classes.adjustHeightSignTwo}>
              <div
                className={classes.dihsinBackground}
                style={{ margin: '0 14px' }}
              >
                <DishinMashroomIcon className={classes.topBgIconRight} />
              </div>
              <div style={{ margin: '0 16px', textAlign: 'center' }}>
                <Typography
                  variant='h1'
                  align='center'
                  className={classes.pageTitleRed}
                >
                  LOGIN
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              style={{
                //  backgroundColor: '#f0f0f0',
                height: `${adjustHeightGridThree}px`,
                width: '100%'
              }}
            />
            <Grid
              item
              style={{ width: '100%' }}
              className={classes.adjustHeightSigninFour}
            >
              <div style={{ margin: '0 42px' }}>
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
                <CustomInput
                  id='password'
                  label='Password'
                  type='password'
                  error={passwordError}
                  helperText={<span>{passwordErrorMessage}</span>}
                  fullWidth
                  onChange={event =>
                    this.handleFieldChange('password', event.target.value)
                  }
                />
              </div>
            </Grid>
            <Grid
              item
              style={{
                //  backgroundColor: '#555',
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
                  Log In
                </Button>
              </div>
            </Grid>
            <Grid
              item
              style={{
                //backgroundColor: '#a4a4a4',
                height: `${adjustHeightGridSeven}px`,
                width: '100%'
              }}
            />
            <Grid item className={classes.adjustHeightGridEight}>
              <FooterActions
                linkAction={
                  <div className={classes.footerLatoTextNormal}>
                    Not a user yet?{' '}
                    <a
                      href={`${APP_URL}/sign-up`}
                      className={classnames(
                        classes.footerLatoTextBold,
                        classes.footerLink1
                      )}
                    >
                      Sign up
                    </a>{' '}
                    to the app
                  </div>
                }
              />
            </Grid>
            <Grid
              item
              style={{
                // backgroundColor: '#e9e9e9',
                height: `${adjustHeightGridNine}px`,
                width: '100%'
              }}
            />
          </Grid>
        </form>
      </AppLayout>
    );
  }
}

export default withStyles(styles)(Login);
