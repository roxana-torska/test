import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
import CouponCardItem from '../card/couponCardItem';
import { connect } from 'react-redux';

class RewardList extends PureComponent {
  getItemLists = (el, listItemOnClick, key) => {
    const {
      classes,
      selectedIndex,
      global: { userRewards }
    } = this.props;
    let result = userRewards.find(rec => rec.rewardId === el.id);
    return (
      <ListItem
        key={`rest_${key}`}
        button
        component='div'
        href='#'
        selected={selectedIndex === key}
        alignItems='flex-start'
        onClick={evt => listItemOnClick(evt, key, result)}
        className={classes.listItem}
      >
        <CouponCardItem
          rewardDesc={el.rewardDesc}
          active={result ? true : false}
          isRedeemed={result ? result.isRedeemed : false}
        />
      </ListItem>
    );
  };
  render() {
    const { listData, listItemOnClick, classes } = this.props;
    let listLayout = [];
    listData.forEach((el, index) => {
      listLayout.push(this.getItemLists(el, listItemOnClick, index));
    });
    return <List className={classes.listRoot}>{listLayout}</List>;
  }
}

export default connect(
  state => ({
    global: state.global
  }),
  {}
)(withStyles(styles)(RewardList));
