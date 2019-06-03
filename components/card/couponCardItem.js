import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';

class CouponCardItem extends Component {
  render() {
    const { classes, rewardDesc, active, isRedeemed } = this.props;
    console.log('reward Desc', rewardDesc);
    const rewardDescArr = rewardDesc.split('%');
    return (
      <Grid
        container
        direction='row'
        spacing={0}
        className={classes.couponCardItem}
        wrap='nowrap'
      >
        <Grid
          item
          xs={8}
          className={classes.couponCardItemLeft}
          style={{ position: 'relative' }}
        >
          <div
            style={{ position: 'absolute' }}
            className={classes.roundBorderTop}
          />
          <div className={classes.couponCardItemDecNo}>{rewardDescArr[0]}%</div>
          <div className={classes.couponCardItemDec}>{rewardDescArr[1]}</div>
          <div
            style={{ position: 'absolute' }}
            className={classes.roundBorderBottom}
          />
        </Grid>
        <Grid item xs={4} className={classes.couponCardItemRight}>
          <div
            className={
              active && !isRedeemed
                ? classes.activeCoupon
                : classes.inactiveCoupon
            }
          >
            <SvgIcon viewBox='0 0 28 17'>
              <path d='M25.791 15.926h.856a.843.843 0 0 0 0-1.687h-.339C26.2 7.907 21.224 2.738 14.966 2.35V.836a1 1 0 0 0-.678-.324c-.5-.028-.806.353-.835.39-.002.285-.004 1.4 0 1.448C7.194 2.738 2.219 7.907 2.11 14.24h-.757a.842.842 0 1 0 0 1.686h1.274a.755.755 0 0 0 .237.038h22.69a.755.755 0 0 0 .237-.038zM3.623 14.239c.113-5.75 4.81-10.376 10.586-10.376 5.777 0 10.474 4.625 10.587 10.376H3.623z' />
              <path d='M25.791 15.926v-.51h-.082l-.078.025.16.485zm.517-1.687l-.51.01.008.501h.502v-.51zM14.966 2.35h-.511v.48l.479.03.032-.51zm0-1.514h.51V.641l-.13-.146-.38.341zm-.678-.324l-.028.51h.005l.023-.51zm-.835.39L13.05.59l-.107.138V.9l.51.003zm0 1.448l.032.51.523-.032-.046-.523-.51.045zM2.11 14.24v.51h.502l.009-.502-.511-.009zm.517 1.686l.16-.485-.078-.026h-.082v.51zm.996-1.687l-.51-.01-.01.521h.52v-.51zm21.173 0v.511h.52l-.01-.52-.51.01zm.995 2.198h.856v-1.022h-.856v1.022zm.856 0c.749 0 1.353-.608 1.353-1.355h-1.022c0 .185-.149.333-.331.333v1.022zM28 15.082c0-.748-.605-1.353-1.353-1.353v1.021c.183 0 .331.148.331.332H28zm-1.353-1.353h-.339v1.021h.339V13.73zm.172.502c-.113-6.6-5.297-11.986-11.822-12.39l-.063 1.019c5.993.371 10.76 5.322 10.864 11.388l1.021-.017zM15.476 2.35V.835h-1.021V2.35h1.021zm-.13-1.856a1.511 1.511 0 0 0-1.034-.493l-.047 1.02a.504.504 0 0 1 .32.155l.76-.682zm-1.03-.493c-.775-.043-1.225.535-1.266.587l.806.627c-.003.005.043-.055.124-.11a.448.448 0 0 1 .28-.084l.057-1.02zM12.943.9a283.046 283.046 0 0 0-.002 1.245c0 .095 0 .21.004.25l1.018-.09v-.162a118.234 118.234 0 0 1 .002-1.238L12.942.9zm.48.94c-6.525.405-11.71 5.792-11.823 12.39l1.022.018C2.725 8.182 7.49 3.231 13.485 2.86l-.064-1.02zM2.11 13.73h-.757v1.021h.757V13.73zm-.757 0c-.748 0-1.353.605-1.353 1.353h1.022c0-.184.148-.332.331-.332V13.73zM0 15.082c0 .747.604 1.355 1.353 1.355v-1.022a.332.332 0 0 1-.331-.333H0zm1.353 1.355h1.274v-1.022H1.353v1.022zm1.114-.026c.126.041.26.064.397.064v-1.022a.245.245 0 0 1-.077-.012l-.32.97zm.397.064h22.69v-1.022H2.864v1.022zm22.69 0c.138 0 .272-.023.398-.064l-.32-.97a.245.245 0 0 1-.078.012v1.022zm-21.42-2.226C4.24 8.776 8.71 4.374 14.209 4.374V3.352c-6.055 0-10.978 4.849-11.097 10.877l1.022.02zm10.075-9.875c5.498 0 9.969 4.402 10.076 9.875l1.021-.02C25.188 8.201 20.265 3.352 14.21 3.352v1.022zm10.587 9.355H3.623v1.021h21.173V13.73z' />
            </SvgIcon>
          </div>
          <div
            className={
              active && !isRedeemed
                ? classes.activeCoupon
                : classes.inactiveCoupon
            }
          >
            {isRedeemed ? 'Already Redeemed' : 'Redeem Now'}
          </div>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(CouponCardItem);
