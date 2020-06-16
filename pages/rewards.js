import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RestaurantLayout from '../components/layouts/RestaurantLayout';
import styles from '../styles/common';
import { Scrollbars } from 'react-custom-scrollbars';
import RewardLists from '../components/restaurantLists/rewardList';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import actions from '../redux/global/actions';
import { connect } from 'react-redux';
import { rewardAPI } from '../services/rewardAPI';
import WindowResizeListener from 'react-window-size-listener';
import notify from '../utils/notifier';
import { APP_URL } from '../utils/config';
const { updateStoreWithQuery, toggleFilterMenu, showHideMenu } = actions;

const userShareCount = 5;
const redeemedRewards = [];
class Rewards extends PureComponent {
  state = {
    pointPercent: 0,
    winHeight: 400,
    overlay: false
  };
  static getInitialProps({ store, isServer, query }) {
    let rewards = query.rewards || [];
    let { ...queryParams } = query;
    rewards = rewards.map(rec => {
      return {
        id: rec._id,
        rewardDesc: rec.rewardDesc,
        rewardPoints: rec.rewardPoints,
        rewardDeductPoint: rec.deductPoints,
        active: false
      };
    });
    return { rewards, queryParams };
  }

  componentDidMount() {
    const { updateStoreWithQuery, queryParams } = this.props;
    if (typeof document !== 'undefined') {
      window.addEventListener('scroll', this.handleOnScroll);
    }
    updateStoreWithQuery({ ...queryParams, selectedPageTab: 2 });
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      window.removeEventListener('scroll', this.handleOnScroll);
    }
  }

  renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: 'rgba(240,242,245,.5)',
      border: '1px solid rgba(0,0,0,.3)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  handListItemClick = (evt, selectedIndex, selectedReward) => {
    evt.preventDefault();
    if (selectedReward) {
      const {
        global: { token }
      } = this.props;
      const params = {
        rewardId: selectedReward.rewardId,
        token
      };
      rewardAPI
        .reedmedReward(params)
        .then(response => {
          if (response.status.toLowerCase() === 'ok') {
            notify(response.msg);
            setTimeout(() => {
              window.location.href = `/redeem`;
            }, 2000);
          } else {
            notify(response.msg);
          }
        })
        .catch(err => {
          notify(err);
        });
    }
  };

  getRewardCountProgress = () => {
    let pointToGain = null;
    let pointPercent = null;
    let nextActiveRecord = this.getNextActiveReward();
    if (nextActiveRecord) {
      pointToGain = nextActiveRecord.rewardPoints - userShareCount;
      pointPercent = (userShareCount / nextActiveRecord.rewardPoints) * 100;
    }
    return { pointToGain, pointPercent };
  };

  getNextActiveReward = () => {
    const {
      rewards,
      global: { userRewards }
    } = this.props;
    userRewards.map(reward => {
      redeemedRewards.push(reward.rewardId);
    });
    let founded = rewards.find(reward => !redeemedRewards.includes(reward.id));
    return founded;
  };

  handleToggleMenu = toggleMenu => {
    const { toggleFilterMenu } = this.props;
    toggleFilterMenu({ drawerOpen: toggleMenu });
  };

  handleOverlay = value => {
    this.setState({ overlay: !value });
  };

  handleShowMenu = evt => {
    const {
      showHideMenu,
      global: { scrollValue }
    } = this.props;
    if (window.pageYOffset > scrollValue) {
      showHideMenu(false, window.pageYOffset);
    } else {
      showHideMenu(true, window.pageYOffset);
    }
  };

  handleOnScroll = evt => {
    this.handleShowMenu();
  };

  render() {
    const {
      classes,
      rewards,
      queryParams,
      global: { userRewards, isLoggedIn }
    } = this.props;
    const { winHeight } = this.state;
    let rootHeight = winHeight - 100;
    const { pointPercent, pointToGain } = this.getRewardCountProgress();
    return (
      <RestaurantLayout
        selectedPageTab={2}
        toggleMenu={this.handleToggleMenu}
        changeOverlay={this.handleOverlay}
      >
        <WindowResizeListener
          onResize={windowSize => {
            this.setState({ winHeight: windowSize.windowHeight });
          }}
        />
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={0}
        >
          <Grid
            item
            xs={12}
            style={{ margin: '40px 0px 0px 0px', padding: '16px' }}
          >
            {pointToGain ? (
              <div>
                <div
                  className={classes.rewardHeading}
                  style={{ marginBottom: '20px' }}
                >
                  Share your reviews and get rewards!
                </div>
                <LinearProgress
                  color='primary'
                  variant='determinate'
                  value={pointPercent}
                  classes={{
                    root: classes.rewardProgress
                  }}
                />
                <div
                  className={classes.pointToGain}
                  style={{ marginTop: '10px' }}
                >
                  <CardGiftcard
                    color='primary'
                    className={classes.reviewFooterItemIcon}
                  />
                  <span className={classes.pointToGainText}>
                    Only {pointToGain} more to go!
                  </span>
                </div>
              </div>
            ) : null}
          </Grid>

          {rewards ? (
            <Grid item xs={12} style={{ margin: '0px 0px' }}>
              <RewardLists
                listItemOnClick={this.handListItemClick}
                listData={rewards}
                listItemClass={classes.restaurantsListItem}
              />
            </Grid>
          ) : (
            'No reviews found'
          )}
        </Grid>
      </RestaurantLayout>
    );
  }
}

export default connect(
  state => ({
    global: state.global
  }),
  {
    updateStoreWithQuery,
    toggleFilterMenu,
    showHideMenu
  }
)(withStyles(styles)(Rewards));
