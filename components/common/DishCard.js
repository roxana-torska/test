import React, { PureComponent } from 'react';
import { withStyles, Typography } from '@material-ui/core';
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
import { Star } from '@material-ui/icons';
import { css } from 'emotion';

class DishCard extends PureComponent {
  state = {
    showReview: false,
    open: false,
    userDishRating: 0,
  };

  showReviewDialog = evt => {
    evt.stopPropagation();
    const { showReview } = this.state;
    this.setState({ showReview: !showReview });
  };
  showReviewCard = () => {
    this.setState({ showReview: true });
  }

  handleDishCardCancel = evt => {
    evt.stopPropagation();
    const { onCancel } = this.props;
    this.setState({ showReview: false });
    onCancel(evt);
  };

  handleOnSubmit = (type, commonRating, dishId) => {
    const { onSubmit } = this.props;
    // this.setState({ showReview: true });
    onSubmit(type, commonRating, dishId);
  };
  showDishDetails = (evt) => {
    console.log("dish data===>",this.props.data)
    window.location.href = `/dish-details/${this.props.data.slug}/${this.props.data.providerName}`;
    
  }
  onIncreament = () => {
    let { userDishRating } = this.state;
    console.log("user rating===>", userDishRating)
    if (userDishRating < 10) {
      this.setState({
        userDishRating: this.state.userDishRating + 1
      })
    }
  }
  render() {
    const {
      data,
      classes,
      onSubmit,
      global: { userReviews, user },
      showUserReview
    } = this.props;
    console.log("data====>", data);
    let { showReview, userDishRating } = this.state;
    let dishAvatar = '';

    let dishAvgRating = data.avgRatings;
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
      dishAvgRating = userReviews[data.id].dish.avgRatings;
    } else if (data.reviews) {
      userDishRating = data.reviews.ratings;
    } else {
      userDishRating = 0;
    }
    // onClick={this.showDishDetails}
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
                    {data.avgRatings.toFixed(2)}
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
                <Grid item xs={4} className={classes.listCardFooterPrice}>
                  <div className={classes.listCardDishPrice}>
                    ${data.price.toFixed(2)}
                  </div>
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{ textAlign: 'right', position: 'relative' }}
                  zeroMinWidth
                >
                  <div onClick={this.showReviewCard}>
                    <StarRate className={
                      css`
                        font-size:24px,
                      `
                    } color="primary" />
                    <Typography
                      className={
                        css`
                          font-family: Lato;
                          font-size: 12px;
                          line-height: 20px;
                          /* or 167% */
                          color: #F44336;
                          margin-top:2px;
                          display:inline-block;
                          vertical-align:top;

                      `
                      }
                    >
                      Quick Rate
                    </Typography>
                  </div>
                  {/* <RatingInFabIcon
                    handleClickOpen={this.handleClickOpen}
                    reviewRating={data.reviews && data.reviews.ratings || 0}
                    handleOnSubmit={this.props.onSubmit}
                    data={{ "type": data.type, "dishId": data.id }}
                    showDetails={this.showDishDetails}
                  /> */}

                  {/* <ReviewCard url={dishAvatar || '/static/imgs/image-not-found-dark.png'} /> */}
                </Grid>
              </Grid>
            }
          />
        </Grid>
        {showReview ? (
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
                    <span onClick={this.showDishDetails}>
                      to full review
                    </span>
                  </Grid>
                </Grid>
              }
              actionItems={
                <UpdateRating
                  rating={userDishRating || 0}
                  showBorder={true}
                  onIncreament={this.onIncreament}
                  onSubmit={this.handleOnSubmit}
                  onCancel={this.handleDishCardCancel}
                  dishData={data}
                />
              }
            />
          </Grid>
        ) : null}
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
