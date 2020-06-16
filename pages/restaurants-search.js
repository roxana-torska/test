import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RestaurantLayout from '../components/layouts/RestaurantLayout';
import styles from '../styles/common';
import { APP_URL, API_IMAGE_URL } from '../utils/config';

import { Scrollbars } from 'react-custom-scrollbars';
import RestaurantList from '../components/restaurantLists/RestaurantList';
import SpeedDials from '../components/menu/FloatingActionMenu';

import { connect } from 'react-redux';
import SponsoredRestaurantsList from '../components/restaurantLists/sponsoredRestaurantsLists';
import DishesList from '../components/restaurantLists/dishLists';
import NotFound from '../components/notFound/notFound';
import WindowResizeListener from 'react-window-size-listener';
import Slide from '@material-ui/core/Slide';
import * as _ from 'lodash';
import { getLocation } from '../utils/common';
import restaurantsAction from '../redux/restaurants/actions'
import { restaurantAPI } from '../services/restaurantAPI';
import actions from '../redux/global/actions';
const { setRestaurants, setDishes, setCurrentResuarant } = restaurantsAction;

const {
  toggleFilterMenu,
  updateStoreWithQuery,
  selectFilterTab,
  showHideMenu
} = actions;

function Transition(props) {
  return <Slide direction='down' {...props} />;
}
class Restaurants extends React.Component {
  state = {
    restaurants: [],
    selectedTab: 0,
    selectedIndex: -1,
    restaurantName: '',
    winHeight: 400,
    overlay: false,
    hideMainMenu: true,
    openDialog: false
  };

  getRestaurantImage = rec => {
    if (rec.images.length) {
      return `${API_IMAGE_URL}/assets/images/restaurants/${rec.slug}/${
        rec.images[0].path
        }`;
    } else {
      return '';
    }
  };

  static async getInitialProps({ store, isServer, query }) {
    if (query) {
      let { restaurants, dishes, similarRestaurants, ...queryParams } = query;

      let sponsoredRestaurants = restaurants.filter(
        rec => rec.restaurant_id.isSponsored
      );
      restaurants = restaurants.filter(rec => !rec.restaurant_id.isSponsored);

      restaurants = restaurants.map(rec => {
        let restAvatar = '';

        if (rec.restaurant_id.images.length) {
          restAvatar = `${API_IMAGE_URL}/assets/images/restaurants/${
            rec.restaurant_id.slug
            }/${rec.restaurant_id.images[0].path}`;
        }

        return {
          avatar: restAvatar,
          primary: rec.restaurant_id.name,
          slug: rec.restaurant_id.slug,
          secondary: rec.address,
          id: rec.restaurant_id._id,
          providerName: '',
          isSponsored: rec.restaurant_id.isSponsored,
          distance: _.isNumber(rec.distance)
            ? (rec.distance / 1000).toFixed(2)
            : null,
          type: 'restaurant',
          totalReviews: rec.dishes.totalReviews
        };
      });
      sponsoredRestaurants = sponsoredRestaurants.map(rec => {
        let restAvatar = '';

        if (rec.restaurant_id.images.length) {
          restAvatar = `${API_IMAGE_URL}/assets/images/restaurants/${
            rec.restaurant_id.slug
            }/${rec.restaurant_id.images[0].path}`;
        }

        return {
          avatar: restAvatar,
          primary: rec.restaurant_id.name,
          slug: rec.restaurant_id.slug,
          secondary: rec.address,
          id: rec.restaurant_id._id,
          providerName: '',
          isSponsored: rec.restaurant_id.isSponsored,
          distance: _.isNumber(rec.distance)
            ? (rec.distance / 1000).toFixed(2)
            : null,
          type: 'restaurant',
          totalReviews: rec.dishes.totalReviews
        };
      });

      similarRestaurants = similarRestaurants.map(rec => {
        let restAvatar = '';

        if (rec.restaurant_id.images.length) {
          restAvatar = `${API_IMAGE_URL}/assets/images/restaurants/${
            rec.restaurant_id.slug
            }/${rec.restaurant_id.images[0].path}`;
        }
        return {
          avatar: restAvatar,
          primary: rec.restaurant_id.name,
          slug: rec.restaurant_id.slug,
          secondary: rec.address,
          id: rec.restaurant_id._id,
          providerName: '',
          isSponsored: rec.restaurant_id.isSponsored,
          type: 'restaurant',
          distance: null,
          totalReviews: rec.dishes.totalReviews
        };
      });
      return {
        queryParams: { ...queryParams },
        restaurants,
        selectedTab: 0,
        dishes,
        sponsoredRestaurants,
        similarRestaurants
      };
    }
  }
  componentDidMount() {
    const { updateStoreWithQuery, queryParams, setRestaurants, setDishes } = this.props;

    if (typeof document !== 'undefined') {
      window.addEventListener('scroll', this.handleOnScroll);
    }
    let localLocation = getLocation();
    const { filters } = queryParams;
    if (
      filters &&
      filters.location &&
      (filters.location.lng && filters.location.lat)
    ) {
      localLocation = filters.location;
    } else {
      queryParams.filters = queryParams.filters || {};
      queryParams.filters.location = { ...localLocation };
    }

    updateStoreWithQuery({
      ...queryParams,
      selectedPageTab: 0,
      location: { ...localLocation }
    });

    setRestaurants({
      data: this.props.sponsoredRestaurants,
    })
    setDishes({
      data: this.props.dishes
    })

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

  handListItemClick = (evt, selectedIndex) => {
    evt.preventDefault();
    const found = this.state.restaurants[selectedIndex] || { primary: '' };
    if (found.primary) {
      this.setState({ selectedIndex, restaurantName: found.primary });
    } else {
      this.setState({ selectedIndex: '', restaurantName: '' });
    }
  };

  handleSortClick = () => {
    const { toggleFilterMenu, selectFilterTab } = this.props;
    this.setState({ selectedTab: 1 });
    selectFilterTab(1);
    toggleFilterMenu({ drawerOpen: true });
  };

  handleFilterClick = () => {
    const { toggleFilterMenu, selectFilterTab } = this.props;
    this.setState({ selectedTab: 0 });
    selectFilterTab(0);
    toggleFilterMenu({ drawerOpen: true });
  };

  handleToggleMenu = toggleMenu => {
    const { toggleFilterMenu } = this.props;
    toggleFilterMenu({ drawerOpen: toggleMenu });
  };

  handleOverlay = value => {
    this.setState({ overlay: !value });
  };

  handleListItemClick = (evt, index, value) => {
    console.log("value======>", value);
    if (value.type === 'restaurant') {
      let data = restaurantAPI.getCurrentRestaurant(value.id).then(response => {
        console.log("data====>", response.data);
        this.props.setCurrentResuarant({ data: response.data })

      });
      window.location.href = `/restaurants/${value.id}`;
    }
    if (value.type === 'dish') {
      window.location.href = `/dish-details/${value.slug}`;
    }
  };

  handleShowMenu = () => {
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
    // !window.requestAnimationFrame
    //   ? setTimeout(this.handleShowMenu.bind(this), 250)
    //   : requestAnimationFrame(this.handleShowMenu.bind(this));
  };

  handleReviewSubmit = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
    //window.location.reload(true);
  };

  render() {
    const {
      classes,
      restaurants,
      sponsoredRestaurants,
      dishes,
      global: { name, isLoggedIn, lastRatedDish, hideFabIcon },
      similarRestaurants,
      restaurantss
    } = this.props;


    const { winHeight, overlay, openDialog, hideMainMenu } = this.state;
    let rootHeight = winHeight - 100;

    return (
      <RestaurantLayout
        selectedPageTab={0}
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
          className={classes.dishListTopSpace}
          style={{ marginTop: '104px' }}
        >
          {!sponsoredRestaurants.length &&
            !restaurants.length &&
            !dishes.length ? (
              <Grid item xs={12}>
                <NotFound name={name} isLoggedIn={isLoggedIn} />
                <p
                  style={{ margin: '20px', borderBottom: '2px solid #ededed' }}
                />
                <SponsoredRestaurantsList
                  listItemOnClick={this.handleListItemClick}
                  listData={similarRestaurants}
                  listItemClass={classes.restaurantsListItem}
                />
              </Grid>
            ) : (
              ''
            )}
          {sponsoredRestaurants.length ? (
            <Grid item xs={12}>
              <SponsoredRestaurantsList
                listItemOnClick={this.handleListItemClick}
                listData={sponsoredRestaurants}
                listItemClass={classes.restaurantsListItem}
              />
            </Grid>
          ) : (
              ''
            )}
          {restaurants.length ? (
            <Grid item xs={12}>
              {sponsoredRestaurants.length ? (
                <p
                  style={{
                    margin: '20px',
                    borderBottom: '2px solid #ededed'
                  }}
                />
              ) : null}

              <RestaurantList
                listItemOnClick={this.handleListItemClick}
                listData={restaurants}
                listItemClass={classes.restaurantsListItem}
              />
            </Grid>
          ) : (
              ''
            )}
          {dishes.length ? (
            <Grid item xs={12}>
              {restaurants.length && sponsoredRestaurants.length ? (
                <p
                  style={{
                    margin: '20px',
                    borderBottom: '2px solid #ededed'
                  }}
                />
              ) : null}

              <DishesList
                listItemOnClick={this.handleListItemClick}
                listData={dishes}
                listItemClass={classes.restaurantsListItem}
                changeOverlay={this.handleOverlay}
                isLoggedIn={isLoggedIn}
                onReviewSubmit={this.handleReviewSubmit}
              />
            </Grid>
          ) : (
              ''
            )}
          {similarRestaurants.length <= 0 && !hideFabIcon ? (
            <SpeedDials
              sortClick={this.handleSortClick}
              filterClick={this.handleFilterClick}
              changeOverlay={this.handleOverlay}
            />
          ) : null}
          {overlay ? <div className={classes.overlay} /> : null}
        </Grid>
      </RestaurantLayout>
    );
  }
}

export default connect(
  state => ({
    global: state.global,
    restaurantss: state.RestaurantsReducer.restaurants,
  }),
  {
    toggleFilterMenu,
    updateStoreWithQuery,
    selectFilterTab,
    showHideMenu,
    setRestaurants,
    setDishes,
    setCurrentResuarant
  }
)(withStyles(styles)(Restaurants));
