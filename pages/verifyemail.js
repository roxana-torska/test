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

class VerifyEmail extends PureComponent {
  static getInitialProps({ store, isServer, query }) {
    console.log('query', query);
    const { verifyStatus } = query;
    return { verifyStatus };
  }

  handleSubmit = () => {
    Router.push(`${APP_URL}`);
  };

  render() {
    const { classes, verifyStatus } = this.props;
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
            <React.Fragment>
              <Grid item xs={12}>
                <Typography
                  variant='h1'
                  align='center'
                  className={classes.pageTitleRed}
                >
                  Verify Email
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
                <div className={classes.pageInfo}>{verifyStatus}</div>
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
                  Continue
                </Button>
              </Grid>
            </React.Fragment>
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

export default withStyles(styles)(VerifyEmail);
