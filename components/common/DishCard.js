import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';
import styles from '../../styles/common';
import ListCardItem from '../../components/card/listCardItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { API_IMAGE_URL } from '../../utils/config';
import UpdateRating from '../common/UpdateRating';
import StarRate from '@material-ui/icons/StarRate';
import { connect } from 'react-redux';
import RatingInFabIcon from './RatingInFabIcon';
import Modal from './Modal';
import ReviewCard from '../review/ReviewCard';

class DishCard extends PureComponent {
  state = {
    showReview: false,
    open: false,
  };

  showReviewDialog = evt => {
    evt.stopPropagation();
    const { showReview } = this.state;
    this.setState({ showReview: !showReview });
  };

  handleDishCardCancel = evt => {
    evt.stopPropagation();
    const { onCancel } = this.props;
    this.setState({ showReview: false });
    onCancel(evt);
  };

  handleOnSubmit = (event, commonRating, dishId) => {
    const { onSubmit } = this.props;
    // this.setState({ showReview: true });
    onSubmit(event, commonRating, dishId);
  };

  render() {
    const {
      data,
      classes,
      onSubmit,
      global: { userReviews, user },
      showUserReview
    } = this.props;
    console.log("data latest=====>", data);
    const { showReview } = this.state;
    let dishAvatar = '';
    let userDishRating = 0;
    // let dishAvgRating = data.avgRatings;
    if (data.images.length) {
      dishAvatar = `${API_IMAGE_URL}/assets/images/dishes/${data.images[0].name}/${
        data.images[0].path
        }`;
    }

    if (
      userReviews[data.id] &&
      userReviews[data.id].typeId === data.id &&
      userReviews[data.id].userId === user.user_id
    ) {
      userDishRating = userReviews[data.id].ratings;
      // dishAvgRating = userReviews[data.id].dish.avgRatings;
    } else if (data.reviews) {
      userDishRating = data.reviews.ratings;
    } else {
      userDishRating = 0;
    }
    return (
      <Grid container direction='row'>
        <Grid item xs={12}>
          <ListCardItem
            title={
              <Grid container direction='row' spacing={0} wrap='nowrap'>
                <Grid item xs={9} className={classes.nameEllipsis}>
                  {data.primary}
                  <div className={classes.dishProviderName}>
                    {data.providerName}
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div
                    className={classes.listCardDishRating}
                    style={{ textAlign: 'right' }}
                  >
                    <StarRate className={classes.reviewFooterItemIcon} />
                    {0}
                  </div>
                </Grid>
              </Grid>
            }
            description={data.secondary}
            image={dishAvatar || '/static/imgs/image-not-found-dark.png'}
            fullWidthImage={true}
            footerItems={
              <Grid
                container
                direction='row'
                spacing={0}
                wrap='nowrap'
                className={classes.reviewFooterItem}
                style={{ marginTop: '0px' }}
              >
                <Grid item xs={6} className={classes.listCardFooterPrice}>
                  <div className={classes.listCardDishPrice}>
                    ${data.price.toFixed(2)}
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ textAlign: 'right', position: 'relative' }}
                  zeroMinWidth
                >
                  {/* 
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />

                  </svg>
                  <span style={{ fontSize: "20px", marginTop: "5px", marginLeft: "2px" }}>
                    Share
                  </span> */}
                  <RatingInFabIcon
                    handleClickOpen={this.handleClickOpen}
                    handleOnSubmit={this.props.onSubmit}
                    data={{ "type": data.type, "dishId": data.id }}
                  />

                  {/* <ReviewCard url={dishAvatar || '/static/imgs/image-not-found-dark.png'} /> */}
                </Grid>
              </Grid>
            }
          />
        </Grid>
        {/* {showReview ? (
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <ListCardItem
              title={
                <Grid container direction='row' spacing={0} wrap='nowrap'>
                  <Grid item xs={9} className={classes.nameEllipsis}>
                    {data.primary}
                    <div className={classes.dishProviderName}>
                      {data.providerName}
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div
                      className={classes.listCardDishRating}
                      style={{ textAlign: 'right' }}
                    >
                      <StarRate className={classes.reviewFooterItemIcon} />
                      {dishAvgRating}
                    </div>
                  </Grid>
                </Grid>
              }
              description={data.secondary}
              fullWidthImage={true}
              footerItems={
                <Grid
                  container
                  direction='row'
                  spacing={0}
                  wrap='nowrap'
                  className={classes.reviewFooterItem}
                >
                  <Grid item xs={6} className={classes.listCardFooterPrice}>
                    <div className={classes.listCardDishPrice}>
                      ${data.price.toFixed(2)}
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{ textAlign: 'right' }}
                    zeroMinWidth
                    className={classes.makeAReview}
                  >
                    to full review
                  </Grid>
                </Grid>
              }
              actionItems={
                <UpdateRating
                  rating={userDishRating || 0}
                  showBorder={true}
                  onSubmit={this.handleOnSubmit}
                  onCancel={this.handleDishCardCancel}
                  dishData={data}
                />
              }
            />
          </Grid>
        ) : null} */}
      </Grid>
    );
  }
}
export default connect(
  state => ({
    global: state.global
  }),
  {}
)(withStyles(styles)(DishCard));
