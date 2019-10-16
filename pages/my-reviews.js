import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RestaurantLayout from '../components/layouts/RestaurantLayout';
import styles from '../styles/common';
import { Scrollbars } from 'react-custom-scrollbars';
import ReviewLists from '../components/restaurantLists/reviewLists';
import actions from '../redux/global/actions';
import { connect } from 'react-redux';
import WindowResizeListener from 'react-window-size-listener';
import { API_IMAGE_URL } from '../utils/config';

const { updateStoreWithQuery, toggleFilterMenu, showHideMenu } = actions;
class MyReviews extends PureComponent {
  state = {
    winHeight: 400,
    overlay: false
  };
  static getInitialProps({ store, isServer, query }) {
    let myreviews = query.myreviews || [];
    let { ...queryParams } = query;
    let dishAvatar = '';

    myreviews = myreviews.map(rec => {
      if (rec.typeId.images.length > 0) {
        dishAvatar = `${API_IMAGE_URL}/assets/images/dishes/${
          rec.typeId.slug
          }/${rec.typeId.images[0].path}`;
      } else {
        dishAvatar = '';
      }
      return {
        avatar: dishAvatar,
        primary: rec.typeId.name,
        secondary: '', //rec.restaurant_id.address || '',
        id: rec.id,
        rating: rec.ratings
      };
    });
    return { myreviews, selectedTab: 1, queryParams };
  }

  componentDidMount() {
    const { updateStoreWithQuery, queryParams } = this.props;
    if (typeof document !== 'undefined') {
      window.addEventListener('scroll', this.handleOnScroll);
    }
    updateStoreWithQuery({ ...queryParams, selectedPageTab: 1 });
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
    // !window.requestAnimationFrame
    //   ? setTimeout(this.handleShowMenu.bind(this), 250)
    //   : requestAnimationFrame(this.handleShowMenu.bind(this));
  };

  render() {
    const { classes, myreviews } = this.props;
    const { winHeight } = this.state;
    let rootHeight = winHeight - 100;
    console.log("length of review =====>", this.props.global.userReviews)
    return (
      <RestaurantLayout
        selectedPageTab={1}
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
          {this.props.global.userReviews.length > 0 ? (
            <Grid item xs={12} style={{ margin: '20px 0px' }}>
              <ReviewLists
                listItemOnClick={this.handListItemClick}
                listData={Object.values(this.props.global.userReviews)}
                listItemClass={classes.restaurantsListItem}
              />
            </Grid>
          ) : (
              <Grid
                item
                xs={12}
                style={{ margin: '40px 0px', textAlign: 'center' }}
              >
                No reviews found
            </Grid>
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
)(withStyles(styles)(MyReviews));
