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
import SocialLinks from '../components/common/SocialLinks';
import actions from '../redux/global/actions';
import { connect } from 'react-redux';
import WindowResizeListener from 'react-window-size-listener';
import slug from 'slug';
import { stringify } from 'qs';
import { setLocation } from '../utils/common';
const { setCurrentLocation } = actions;

class WelcomeToDishIn extends PureComponent {
  state = {
    searchValue: '',
    restaurants: [],
    enableApi: true,
    selectedIndex: -1,
    restaurantName: '',
    winHeight: '100vh'
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

  handleSubmit = evt => {
    evt.preventDefault();
    const selectedItem = this.autoComplete.selectedItem;
    if (selectedItem && selectedItem.selectedItem) {
      window.location.href = `/restaurants/${slug(
        selectedItem.selectedItem,
        { lower: true }
      )}`;
    } else {
      notify(`Please select a restaurant`);
    }
  };
  autoCompleteRef = ref => {
    this.autoComplete = ref;
  };

  render() {
    const {
      classes,
      global: { location }
    } = this.props;
    const { restaurants, winHeight } = this.state;
    let adjustHeight = 5;
    let abc = 10;
    let rootHeight = winHeight - 56;
    if (rootHeight < 443) {
      rootHeight = 443;
    } else {
      adjustHeight = ((rootHeight - 443) * 20) / 100;
      abc = ((rootHeight - 443) * 40) / 100;
    }

    return (
      <AppLayout {...this.props}>
        <WindowResizeListener
          onResize={windowSize => {
            this.setState({ winHeight: windowSize.windowHeight });
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
              margin: '0px 16px',
              minHeight: `${rootHeight}px`
            }}
          >
            <Grid
              item
              style={{
                backgroundColor: '#f0f0f0',
                height: `${adjustHeight}px`,
                width: '100%'
              }}
            />
            <Grid
              item
              style={{
                backgroundColor: '#666',
                height: '60px',
                width: '100%'
              }}
            >
              <Typography
                variant='h1'
                align='center'
                className={classes.pageTitleRed}
              >
                WELCOME TO DISHIN
              </Typography>
              <div
                className={classes.footerLatoTextNormal}
                style={{
                  margin: '0 26px',
                  marginTop: '10px',
                  textAlign: 'center'
                }}
              >
                {location.address ? (
                  <React.Fragment>
                    <RoomIcon className={classes.iconRoot} />
                    {location.address}
                  </React.Fragment>
                ) : (
                  'Where are you dining today?'
                )}
              </div>
            </Grid>
            <Grid
              item
              style={{
                backgroundColor: '#f0f0f0',
                height: `${adjustHeight}px`,
                width: '100%'
              }}
            />
            <Grid
              item
              style={{
                backgroundColor: '#ddd',
                height: '150px',
                width: '100%'
              }}
            >
              <div style={{ margin: '0 26px' }}>
                <AutoComplete
                  innerRef={this.autoCompleteRef}
                  id='restaurantName'
                  name='restaurantName'
                  placeholder='Restaurant Name'
                  data={restaurants}
                  isOpen={restaurants.length ? true : false}
                />
              </div>
            </Grid>
            <Grid
              item
              style={{
                backgroundColor: '#f0f0f0',
                height: `${adjustHeight}px`,
                width: '100%'
              }}
            />
            <Grid
              item
              style={{
                backgroundColor: '#dadada',
                height: '36px',
                width: '100%'
              }}
            >
              <div style={{ margin: '0 40px' }}>
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
                backgroundColor: '#f0f0f0',
                height: `${abc}px`,
                width: '100%'
              }}
            />
            <Grid
              item
              style={{
                backgroundColor: '#fafafa',
                height: '197px',
                width: '100%',
                textAlign: 'center'
              }}
            >
              <Typography>&#160;</Typography>
              <div className={classes.footerLatoTextNormal}>
                New User?{' '}
                <a
                  href={`/sign-up`}
                  className={classnames(
                    classes.footerLatoTextBold,
                    classes.footerLink1
                  )}
                >
                  Sign Up
                </a>{' '}
                to the app
              </div>
              <Typography>&#160;</Typography>
              <div className={classes.footerLatoTextNormal}>
                Or Connect with
              </div>
              <Typography>&#160;</Typography>
              <SocialLinks />
              <div className={classes.footerLatoTextNormal}>
                Forgot Password?{' '}
                <a
                  href={`/recover-password`}
                  className={classnames(
                    classes.footerLatoTextBold,
                    classes.footerLink1
                  )}
                >
                  Recover Password
                </a>
              </div>
            </Grid>
          </Grid>
        </form>
      </AppLayout>
    );
  }
}

export default connect(
  state => ({
    global: state.global.toJSON()
  }),
  {
    setCurrentLocation
  }
)(withStyles(styles)(WelcomeToDishIn));
