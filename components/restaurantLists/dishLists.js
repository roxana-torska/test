import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { APP_URL, API_IMAGE_URL } from '../../utils/config';
import actions from '../../redux/global/actions';
import DishCard from '../common/DishCard';
import { reviewAPI } from '../../services/reviewAPI';

const { updateUserReview } = actions;
class DishesList extends PureComponent {
  state = {
    anchorEl: null,
    reviewOpen: false,
    commonRating: null,
    currentItem: {}
  };

  handleReviewClose = evt => {
    evt.stopPropagation();
    const { changeOverlay } = this.props;
    this.setState({
      anchorEl: null,
      reviewOpen: false,
      commonRating: null,
      currentItem: {}
    });
    changeOverlay(true);
  };

  handleReviewSubmit = async (type, ratings, dishId) => {
    console.log("token =======>", this.props.global.token);
    let payload = {
      ratings,
      dishId,
      type,
      token: this.props.global.token,
      description: "good",

    }

    let resrult = await reviewAPI.addAndUpdateReview(payload)
    if (
      resrult
    ) {
      reviewAPI.getReviews({ token: this.props.global.token }).then(response => {
        const query = {
          myreviews: response,
          // user: req.user,
          // isLoggedIn: req.loggedInToken ? true : false,
          // loggedInToken: req.loggedInToken
        };
        console.log("latest ")
        this.props.updateUserReview(response);
      });
    }
  };

  getItemLists = (el, listItemOnClick, key) => {
    const { classes, selectedIndex, restaurantsName } = this.props;


    return (
      <ListItem
        key={`rest_${key}`}
        button
        component='div'
        href='#'
        selected={selectedIndex === key}
        alignItems='flex-start'
        className={classes.listItem}
      // onClick={evt => listItemOnClick(evt, key, el)}
      >
        <DishCard
          data={el}
          onSubmit={this.handleReviewSubmit}
          onCancel={this.handleReviewClose}
          restaurantsName={restaurantsName}
        />
      </ListItem>
    );
  };
  render() {
    const { listData, listItemOnClick, classes } = this.props;

    return listData.length ? (
      <List className={classes.listRoot}>
        {listData.map((dish, index) => {
          let dishAvatar = '';
          if (dish.images.length) {
            dishAvatar = `${API_IMAGE_URL}/assets/images/dishes/${dish.slug}/${
              dish.images[0].path
              }`;
          }
          const item = {
            avatar: dishAvatar,
            primary: dish.name,
            slug: dish.slug,
            images: dish.images,
            secondary: dish.desc,
            price: dish.price,
            id: dish._id,
            avgRatings: dish.avgRatings || 0,
            avgValueForMoneyRatings: dish.avgValueForMoneyRatings,
            avgTasteRatings: dish.avgTasteRatings,
            avgLookAndFeelRatings: dish.avgLookAndFeelRatings,
            providerName: dish.restaurant_id ? dish.restaurant_id[0].name : '',
            reviews: dish.reviews ? dish.reviews[0] : [],
            tags: dish.tags || [],
            type: 'dish'
          };
          return this.getItemLists(item, listItemOnClick, index);
        })}
      </List>
    ) : (
        <List className={classes.listRoot}>
          <ListItem>
            <div>Not found!</div>
          </ListItem>
        </List>
      );
  }
}

export default connect(
  state => ({
    global: state.global
  }),
  {
    updateUserReview
  }
)(withStyles(styles)(DishesList));
