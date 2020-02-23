import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppLayout from '../components/layouts/AppLayout';
import { Typography } from '@material-ui/core';
import styles from '../styles/common';
import classnames from 'classnames';
import Link from 'next/link';
import AutoComplete from '../components/autoComplete';
import notify from '../utils/notifier';
import { userAPI } from '../services/userAPI';
import Geocode from 'react-geocode';
import { APP_URL, API_IMAGE_URL } from '../utils/config';
import RoomIcon from '@material-ui/icons/Room';
import { Scrollbars } from 'react-custom-scrollbars';

import actions from '../redux/global/actions';
import { connect } from 'react-redux';
import WindowResizeListener from 'react-window-size-listener';
import slug from 'slug';
import { stringify } from 'qs';
import { setLocation } from '../utils/common';
import FooterActions from '../components/common/FooterActions';
import { DishinMashroomIcon } from '../components/customIcon/customIcon';
import restaurantsAction from '../redux/restaurants/actions';
import { restaurantAPI } from '../services/restaurantAPI';
const { setCurrentLocation } = actions;
const { setCurrentResuarant } = restaurantsAction

class WelcomeToDishIn extends PureComponent {
  state = {
		showSuggestions: false,
    searchValue: '',
    restaurants: [],
    enableApi: true,
    selectedIndex: -1,
    restaurantName: '',
    winHeight: '100vh',
    winWidth: '100vw'
  };
  static getInitialProps({ store, isServer }) {
    return { isServer };
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
          Geocode.setApiKey('AIzaSyChP5Ri3hwQG4BRFzmDxqGE_SHQnJwPkjc');
          // Enable or disable logs. Its optional.
          Geocode.enableDebug();

          // Get address from latidude & longitude.
          Geocode.fromLatLng(pos.lat, pos.lng).then(
            response => {
              let address = '';
              const streetAddress = response.results.find(el => {
                return el.types.includes('street_address');
              });
              if (streetAddress) {
                address = streetAddress.formatted_address;
              } else {
                address = response.results[0].formatted_address;
              }
              this.updateLocation({ ...pos, address });
            },
            error => {
              this.updateLocation({ ...pos });
            }
          );
        },
        () => {
          this.updateLocation(null);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.updateLocation(null);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      JSON.stringify(nextProps.global.location) !=
      JSON.stringify(this.props.global.location)
    ) {
      this.loadRestaurants({ ...nextProps.global.location });
    }
  }

  updateLocation = location => {
    const { setCurrentLocation } = this.props;
    setLocation(location);
    setCurrentLocation(location);
    if (!location) {
      this.loadRestaurants();
    }
  };

  getRestaurantAvatar = rec => {

    if (rec.images.length) {
      return `${API_IMAGE_URL}/assets/images/restaurants/${rec.slug}/${
        rec.images[0].path
        }`;
    } else {
      return '';
    }
  };

  loadRestaurants = location => {
    location = location || {};
    userAPI
      .getRestaurants({ name: '', location: { ...location } })
      .then(response => {
        if (response.status === 'ok') {
          console.log("resposed data===>", response.data);
          let restaurants = response.data.map(rec => {
            return {
              avatar: this.getRestaurantAvatar(rec.restaurant_id),
              label: rec.restaurant_id.name,
              id: rec.restaurant_id._id
            };
          });
          this.setState({ restaurants });
        } else {
          this.setState({ restaurants: null });
          notify(response.error);
        }
      });
  };

  // handleChange = searchValue => {
  //   this.setState({ searchValue }, this.searchRestaurants);
  // };

  handListItemClick = (evt, selectedIndex) => {
    evt.preventDefault();
    const found = this.state.restaurants[selectedIndex] || { primary: '' };
    console.log("found-===>", found);
    if (found.primary) {
      this.setState({ selectedIndex, restaurantName: found.primary });
    } else {
      this.setState({ selectedIndex: '', restaurantName: '' });
    }
  };

  renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: 'rgba(240,242,245,.5)',
      border: '1px solid rgba(0,0,0,.3)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  showRestaurentsDetails = (id) => {
    let data = restaurantAPI.getCurrentRestaurant(id).then(response => {
      console.log("data====>", response.data);
      this.props.setCurrentResuarant({ data: response.data })

    })
    if (data) {
      window.location.href = "/restaurant-details"
    }
  }
  handleSubmit = evt => {
    evt.preventDefault();
    const {
      global: { searchText }
    } = this.props;
    console.log("autoComplete", this.autoComplete);
    const selectedItem = this.autoComplete.selectedItem;
    if (selectedItem && selectedItem.selectedItem) {
      let result = this.autoComplete.props.data.filter(rec => rec.label == selectedItem.selectedItem);
      console.log("slected Item after filter====>", result);
      if (result.length > 0) {
        this.showRestaurentsDetails(result[0].id);
      }

    } else {
      if (searchText) {

        let queryParmas = {
          searchText
        };
        // window.location.href = `/restaurants?${stringify(
        //   queryParmas,
        //   { encodeValuesOnly: true }
        // )}`;
      } else {
        notify(`Please select a restaurant`);
      }
    }
	};
	
	openSuggestions = () => {
		this.setState({ showSuggestions: true });
	}

  autoCompleteRef = ref => {
    this.autoComplete = ref;
  };

  render() {
    const {
      classes,
      global: { location }
    } = this.props;
    const { restaurants, winHeight, winWidth } = this.state;

    console.log("restaurents=====>", restaurants)
    // const restaurants = [];
    let adjustHeightGridOne = 10;
    let adjustHeightGridThree = 8;
    let adjustHeightGridFive = 3;
    let adjustHeightGridSeven = 5;
    let adjustHeightGridNine = 2;
    let rootHeight = winHeight - 56;
    let minVisibleHeight = restaurants ? 420 : 420 - 142;
    if (winWidth <= 320) {
      minVisibleHeight = restaurants ? 320 : 320 - 88;
    }
    if (rootHeight < minVisibleHeight) {
      rootHeight = minVisibleHeight;
    } else {
      adjustHeightGridOne = ((rootHeight - minVisibleHeight) * 18) / 100;
      adjustHeightGridThree = ((rootHeight - minVisibleHeight) * 25) / 100;
      adjustHeightGridFive = ((rootHeight - minVisibleHeight) * 15) / 100;
      adjustHeightGridSeven = ((rootHeight - minVisibleHeight) * 20) / 100;
      adjustHeightGridNine = ((rootHeight - minVisibleHeight) * 10) / 100;
    }

    return (
      <AppLayout {...this.props}>
        <WindowResizeListener
          onResize={windowSize => {
            this.setState({
              winHeight: windowSize.windowHeight,
              winWidth: windowSize.windowWidth
            });
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
              margin: '0px',
              minHeight: `${rootHeight}px`
            }}
          >
            <Grid
              item
              style={{
                //backgroundColor: '#f0f0f0',
                height: `${adjustHeightGridOne}px`,
                width: '100%'
              }}
            />
            <Grid
              item
              style={
                {
                  //backgroundColor: '#666',
                  // height: '60px',
                  // width: '100%'
                }
              }
              className={classes.adjustHeightGridTwo}
            >
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
                  WELCOME TO DISHIN
                </Typography>
                <div
                  className={classnames(
                    classes.footerLatoTextNormal,
                    classes.locationAddress
                  )}
                  style={{
                    margin: '0 26px',
                    textAlign: 'center',
                    marginTop: '7px'
                  }}
                >
                  {location.address ? (
                    <React.Fragment>
                      <RoomIcon className={classes.iconRoot} />
                      {location.address}
                    </React.Fragment>
                  ) : (
                      'where are you dining today?'
                    )}
                </div>
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
            <Grid
              item
              // style={{
              //   //backgroundColor: '#ddd',
              //   height: restaurants.length ? '177px' : '35px',
              //   width: '100%'
              // }}
              className={
                restaurants
                  ? classes.adjustHeightGridFour
                  : classes.adjustHeightGridFourNoGeo
              }
            >
              <div style={{ margin: '0 42px' }}>
                <AutoComplete
                  innerRef={this.autoCompleteRef}
                  id='restaurantName'
                  name='restaurantName'
                  placeholder='Restaurant Name'
                  data={restaurants}
									isOpen={restaurants && this.state.showSuggestions ? true : false}
									openSuggestions={this.openSuggestions}
                />
              </div>

            </Grid>
            <Grid
              item
              style={{
                // backgroundColor: '#f0f0f0',
                height: `${adjustHeightGridFive}px`,
                width: '100%'
              }}
            />
            <Grid
              item
              // style={{
              //   //backgroundColor: '#dadada',
              //   height: '36px',
              //   width: '100%',
              //   textAlign: 'center'
              // }}
              className={classes.adjustHeightGridSix}
            >
              <div style={{ margin: '0 82px' }}>
                <Button
                  size='medium'
                  className={classes.btnRaisedLightNormalRed}
                  fullWidth
                  onClick={this.handleSubmit}
                >
                  Next
                </Button>
              </div>
            </Grid>
            <Grid
              item
              style={{
                //backgroundColor: '#f0f0f0',
                height: `${adjustHeightGridSeven}px`,
                width: '100%'
              }}
            />
            <Grid
              item
              // style={{
              //   //backgroundColor: '#fafafa',
              //   height: '145px',
              //   width: '100%',
              //   textAlign: 'center'
              // }}
              className={classes.adjustHeightGridEight}
            >
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
                // backgroundColor: '#f0f0f0',
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

export default connect(
  state => ({
    global: state.global
  }),
  {
    setCurrentResuarant,
    setCurrentLocation
  }
)(withStyles(styles)(WelcomeToDishIn));
