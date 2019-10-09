import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppLayout from '../components/layouts/AppLayout';
import styles from '../styles/common';
import { Scrollbars } from 'react-custom-scrollbars';
import RewardLists from '../components/restaurantLists/rewardList';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import actions from '../redux/global/actions';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import WindowResizeListener from 'react-window-size-listener';
import CustomInput from '../components/customInput/CustomInput';
const { updateStoreWithQuery } = actions;

class Redeem extends PureComponent {
  state = {
    addNewEmail: false,
    winHeight: '100vh'
  };

  static getInitialProps({ store, isServer, query }) {
    let { ...queryParams } = query;
    return { isServer, queryParams };
  }

  componentDidMount() {
    const { updateStoreWithQuery, queryParams } = this.props;
    updateStoreWithQuery({ ...queryParams, selectedPageTab: 2 });
  }

  handleNewEmail = () => {
    this.setState({ addNewEmail: true });
  };

  render() {
    const {
      classes,
      global: { user }
    } = this.props;
    const { addNewEmail, winHeight } = this.state;
    let rootHeight = winHeight - 100;
    if (rootHeight < 240) {
      rootHeight = 240;
    }
    return (
      <AppLayout {...this.props}>
        <WindowResizeListener
          onResize={windowSize => {
            this.setState({ winHeight: windowSize.windowHeight });
          }}
        />
        <div className={classes.container}>
          <Grid
            container
            direction='column'
            justify='space-between'
            alignItems='center'
            spacing={0}
            style={{
              margin: '0px 16px',
              height: `${rootHeight}px`
            }}
          >
            <Grid item>{'  '}</Grid>
            <Grid item>
              <Typography
                variant='h1'
                align='center'
                className={classes.pageTitleRed}
              >
                CONGRATULATIONS!
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.redeemDesc}>
                You just received your first prize
                <br />
                -15% of the next visit to Redneck
              </div>
            </Grid>

            <Grid item>
              <Button color='primary' className={classes.downloadCoupon}>
                Download my coupon
              </Button>
            </Grid>
            <Grid item className={classes.redeemVerticalSpacer}>
              <div>
                &#160;
                <br />
                &#160;
              </div>
            </Grid>
            <Grid item>
              <div className={classes.redeemEmailText}>
                We'll send a coupon to your e-mail:
              </div>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
                spacing={0}
                className={classes.redeemEmail}
              >
                <Grid item xs={2}>
                  <EmailRoundedIcon />
                </Grid>
                <Grid item xs={8} className={classes.redeemUserName}>
                  {user.userName || 'User name'}
                  <br />
                  <span className={classes.redeemUserEmail}>{user.email}</span>
                </Grid>
                <Grid item xs={2} className={classes.emailCheck}>
                  <CheckIcon />
                </Grid>
              </Grid>

              {addNewEmail ? (
                <Grid item xs={12} style={{ margin: '0px 26px' }}>
                  <CustomInput
                    id='email'
                    label='Email'
                    // error={emailError}
                    //helperText={<span>{emailErrorMessage}</span>}
                    onChange={event =>
                      this.handleFieldChange('email', event.target.value)
                    }
                    fullWidth
                  />
                </Grid>
              ) : (
                <div className={classes.addAnotherEmail}>
                  Add another email{' '}
                  <span>
                    <AddIcon
                      onClick={this.handleNewEmail}
                      style={{ verticalAlign: 'middle' }}
                    />
                  </span>
                </div>
              )}
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <div style={{ margin: '0 40px' }}>
                <Button
                  size='medium'
                  className={classes.btnRaisedLightNormalRed}
                  fullWidth
                  //onClick={this.handleSubmit}
                >
                  Next
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </AppLayout>
    );
  }
}

export default connect(
  state => ({
    global: state.global
  }),
  {
    updateStoreWithQuery
  }
)(withStyles(styles)(Redeem));
