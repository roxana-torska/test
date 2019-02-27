import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppLayout from '../components/layouts/AppLayout';
import { Typography } from '@material-ui/core';
import styles from '../styles/common';
import classnames from 'classnames';
import Link from 'next/link';
import CustomInput from '../components/customInput/CustomInput';
import SvgIcon from '@material-ui/core/SvgIcon';
import notify from '../utils/notifier';
import CustomList from '../components/customList/customList';
import { userAPI } from '../services/userAPI';
import Geocode from 'react-geocode';
import { APP_URL } from '../utils/config';
import RoomIcon from '@material-ui/icons/Room';
import { Scrollbars } from 'react-custom-scrollbars';
import SocialLinks from '../components/common/SocialLinks';

class WelcomeToDishIn extends PureComponent {
  state = {
    address: '',
    currentLocation: {
      lat: null,
      lng: null
    },
    searchValue: '',
    restaurants: null,
    enableApi: true,
    selectedIndex: -1,
    restaurantName: ''
  };
  static getInitialProps({ store, isServer }) {
    console.log('Hello');
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
          this.setState({
            currentLocation: pos,
            restaurants: null,
            searchValue: '',
            enableApi: true
          });
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
              this.setState({ address });
              const { searchValue } = this.state;
              this.handleChange(searchValue);
            },
            error => {
              console.error(error);
            }
          );
        },
        () => {
          console.log('no location access');
        }
      );
    } else {
      this.setState({ enableApi: false });
      // Browser doesn't support Geolocation
      console.log('no location access');
    }
  }

  handleChange = value => {
    const { currentLocation, enableApi } = this.state;
    this.setState({ searchValue: value });
    if (enableApi) {
      userAPI
        .getRestaurants({ name: value, location: currentLocation })
        .then(response => {
          if (response.status === 'ok') {
            let restaurants = [];
            response.data.map(rec => {
              let restaurant = {
                avatar: '',
                primary: rec.name,
                secondary: '',
                id: rec._id
              };
              restaurants.push(restaurant);
            });
            this.setState({ restaurants });
          } else {
            this.setState({ restaurants: null });
            notify(response.error);
          }
        });
    }
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

  renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: 'rgba(240,242,245,.5)',
      border: '1px solid rgba(0,0,0,.3)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { restaurantName } = this.state;
    if (restaurantName) {
      notify(`This will open ${restaurantName} menu page`);
      this.setState({ restaurantName: '', searchValue: '' });
    } else {
      notify(`Please select a restaurant`);
      this.setState({ restaurantName: '' });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      address,
      restaurants,
      selectedIndex,
      restaurantName,
      searchValue
    } = this.state;
    let textFieldValue = restaurantName || searchValue;
    return (
      <AppLayout {...this.props}>
        <form className={classes.container} noValidate autoComplete='off'>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={0}
            style={{ margin: '0px 16px' }}
          >
            <Grid item xs={12}>
              <Typography
                variant='h1'
                align='center'
                className={classes.pageTitleRed}
              >
                WELCOME TO DISHIN
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{ margin: '0px 26px  11px' }}
            >
              <div className={classes.footerLatoTextNormal}>
                {address ? (
                  <React.Fragment>
                    <RoomIcon className={classes.iconRoot} />
                    {address}
                  </React.Fragment>
                ) : (
                  'Where are you dining today?'
                )}
              </div>
            </Grid>
            <Grid item xs={12} style={{ margin: '0px 26px' }}>
              <CustomInput
                id='restaurantName'
                label='Restaurant Name'
                onChange={event => this.handleChange(event.target.value)}
                fullWidth
                value={textFieldValue}
              />
            </Grid>
            {restaurants ? (
              <Grid item xs={12} style={{ margin: '0px 26px' }}>
                <Scrollbars
                  style={{ height: 200 }}
                  renderThumbVertical={this.renderThumb}
                  className={classes.listScroll}
                >
                  <CustomList
                    listItemOnClick={this.handListItemClick}
                    listData={restaurants}
                    selectedIndex={selectedIndex}
                  />
                </Scrollbars>
              </Grid>
            ) : (
              ''
            )}
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              className={classes.btnContainer}
            >
              <Button
                size='medium'
                className={classes.btnRaisedLightNormalRed}
                fullWidth
                onClick={this.handleSubmit}
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={0}
            style={{ margin: '0px 16px' }}
          >
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{ margin: '0px 26px  11px' }}
            >
              <div className={classes.footerLatoTextNormal}>
                New User?{' '}
                <Link href={`${APP_URL}/sign-up`}>
                  <a
                    className={classnames(
                      classes.footerLatoTextBold,
                      classes.footerLink1
                    )}
                  >
                    Sign Up
                  </a>
                </Link>{' '}
                to the app
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{ margin: '0px 26px  11px' }}
            >
              <div className={classes.footerLatoTextNormal}>
                Or Connect with
              </div>
            </Grid>
            <SocialLinks />
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{ margin: '0px 26px 11px' }}
            >
              <div className={classes.footerLatoTextNormal}>
                Forgot Password?{' '}
                <Link href={`${APP_URL}/recover-password`}>
                  <a
                    className={classnames(
                      classes.footerLatoTextBold,
                      classes.footerLink1
                    )}
                  >
                    Recover Password
                  </a>
                </Link>
              </div>
            </Grid>
          </Grid>
        </form>
      </AppLayout>
    );
  }
}

export default withStyles(styles)(WelcomeToDishIn);
