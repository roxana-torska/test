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
import { appUrl } from '../utils/config';
import RoomIcon from '@material-ui/icons/Room';
import { Scrollbars } from 'react-custom-scrollbars';

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
                <Link href={`${appUrl}/sign-up`}>
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
            <Grid
              item
              xs={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={0}
              style={{ margin: '0px 26px 3%' }}
            >
              <div style={{ margin: '23px 0px 35px' }}>
                <Link href={`${appUrl}/auth/facebook`}>
                  <SvgIcon className={classes.socialIcon} viewBox='0 0 40 40'>
                    <path
                      fill='#3B5998'
                      d='M20 0C8.972 0 0 8.972 0 20c0 11.027 8.972 20 20 20 11.027 0 20-8.973 20-20C40 8.972 31.029 0 20 0zm4.974 20.704H21.72v11.598h-4.822V20.704h-2.291v-4.099h2.291v-2.651c0-1.899.903-4.866 4.866-4.866l3.573.014v3.979h-2.593c-.422 0-1.022.21-1.022 1.116v2.409h3.673l-.421 4.098z'
                    />
                  </SvgIcon>
                </Link>
                <span style={{ margin: '0px 10px' }} />
                <Link href={`${appUrl}/auth/instagram`}>
                  <SvgIcon className={classes.socialIcon} viewBox='0 0 40 40'>
                    <path
                      fill='#E1306C'
                      d='M25.96 10.643H14.04a3.455 3.455 0 0 0-3.451 3.45v11.922a3.455 3.455 0 0 0 3.45 3.452h11.923a3.455 3.455 0 0 0 3.451-3.451V14.093a3.455 3.455 0 0 0-3.451-3.451zM20 26.252a6.204 6.204 0 0 1-6.197-6.197A6.204 6.204 0 0 1 20 13.858a6.204 6.204 0 0 1 6.197 6.197A6.205 6.205 0 0 1 20 26.252zm6.396-11.113a1.468 1.468 0 0 1-1.466-1.466c0-.808.657-1.466 1.466-1.466.809 0 1.466.658 1.466 1.466 0 .808-.657 1.466-1.466 1.466z'
                    />
                    <path
                      fill='#E1306C'
                      d='M20 16.476a3.583 3.583 0 0 0-3.578 3.577A3.583 3.583 0 0 0 20 23.633a3.582 3.582 0 0 0 3.578-3.58A3.582 3.582 0 0 0 20 16.476z'
                    />
                    <path
                      fill='#E1306C'
                      d='M20 0C8.955 0 0 8.955 0 20s8.955 20 20 20 20-8.955 20-20S31.045 0 20 0zm12.03 26.015a6.076 6.076 0 0 1-6.07 6.07H14.04a6.076 6.076 0 0 1-6.07-6.07V14.093a6.077 6.077 0 0 1 6.07-6.07h11.92a6.076 6.076 0 0 1 6.07 6.07v11.922z'
                    />
                  </SvgIcon>
                </Link>
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
              style={{ margin: '0px 26px 11px' }}
            >
              <div className={classes.footerLatoTextNormal}>
                Forgot Password?{' '}
                <Link href={`${appUrl}/recover-password`}>
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
