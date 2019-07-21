import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppLayout from '../components/layouts/AppLayout';
import { Typography } from '@material-ui/core';
import styles from '../styles/common';
import classnames from 'classnames';
import Link from 'next/link';
import Router from 'next/router';
import { APP_URL } from '../utils/config';
import SocialLinks from '../components/common/SocialLinks';
import WindowResizeListener from 'react-window-size-listener';
import { DishinMashroomIcon } from '../components/customIcon/customIcon';
import FooterActions from '../components/common/FooterActions';

class VerifyEmail extends PureComponent {
  state = {
    winHeight: '100vh',
    winWidth: '100vw'
  };
  static getInitialProps({ store, isServer, query }) {
    const { verifyStatus } = query;
    return { verifyStatus };
  }

  handleSubmit = () => {
    Router.push('/');
  };

  render() {
    const { classes, verifyStatus } = this.props;
    const { winHeight, winWidth } = this.state;
    let adjustHeightGridOne = 10;
    let adjustHeightGridThree = 8;
    let adjustHeightGridSeven = 5;
    let adjustHeightGridNine = 2;
    let rootHeight = winHeight - 56;
    let minVisibleHeight = 241;
    if (winWidth <= 204) {
      minVisibleHeight = 204;
    }
    if (rootHeight < minVisibleHeight) {
      rootHeight = minVisibleHeight;
    } else {
      adjustHeightGridOne = ((rootHeight - minVisibleHeight) * 35) / 100;
      adjustHeightGridThree = ((rootHeight - minVisibleHeight) * 20) / 100;
      adjustHeightGridSeven = ((rootHeight - minVisibleHeight) * 35) / 100;
      adjustHeightGridNine = ((rootHeight - minVisibleHeight) * 10) / 100;
    }
    return (
      <AppLayout {...this.props}>
        <WindowResizeListener
          onResize={windowSize => {
            this.setState({ winHeight: windowSize.windowHeight });
          }}
        />
        <form className={classes.container} noValidate autoComplete='off'>
          <Grid
            container
            direction='column'
            justify='space-between'
            alignItems='center'
            spacing={0}
            style={{
              height: `${rootHeight}px`
            }}
          >
            <Grid
              item
              style={{
                //backgroundColor: '#999',
                height: `${adjustHeightGridOne}px`,
                width: '100%'
              }}
            />
            {!verifyStatus ? (
              <h1>Invalid Token</h1>
            ) : (
              <React.Fragment>
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
                      Verify Email
                    </Typography>
                  </div>
                  <div style={{ margin: '0 40px', textAlign: 'center' }}>
                    {verifyStatus}
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
                <Grid item className={classes.adjustHeightGridSix}>
                  <div style={{ margin: '0 42px' }}>
                    <Button
                      size='medium'
                      className={classes.btnRaisedLightNormalRed}
                      fullWidth
                      onClick={this.handleSubmit}
                    >
                      Continue
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
              </React.Fragment>
            )}
            <Grid item className={classes.adjustHeightGridEight}>
              <FooterActions
                linkAction={
                  <div className={classes.footerLatoTextNormal}>
                    Already in Dishin?{' '}
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
                //  backgroundColor: '#e9e9e9',
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

export default withStyles(styles)(VerifyEmail);
