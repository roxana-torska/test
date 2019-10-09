import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import styles from '../../styles/common';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import { APP_URL } from '../../utils/config';
import actions from '../../redux/global/actions';
import { connect } from 'react-redux';
import { stringify } from 'qs';
import Fab from '@material-ui/core/Fab';
import { getQueryParams } from '../../utils/common';

const { updateSort, setCurrentLocation } = actions;
let color = '#d5d5d5';

class Sort extends Component {
  handleSort = (evt, sortValue, direction) => {
    evt.preventDefault();
    const {
      sortOnClick,
      sort,
      sortDirection,
      global: { location }
    } = this.props;
    let lng = null;
    let lat = null;
    if (sortValue === 'distance') {
      if (!location.lan && !location.lat) {
        this.getLocationPermission();
      } else {
        lng = location.lng;
        lat = Location.lat;
      }
    }
    if (sort === sortValue && sortDirection === direction) {
      sortValue = '';
      direction = '';
    }
    sortOnClick(sortValue, direction, lng, lat);
  };

  getLocationPermission = () => {
    const {
      setCurrentLocation,
      global: { location }
    } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          var pos = {
            lng: position.coords.longitude,
            lat: position.coords.latitude
          };
          setCurrentLocation(pos);
        },
        () => {
          setCurrentLocation(location);
        }
      );
    } else {
      setCurrentLocation(location);
    }
    return location;
  };

  getIconColor = (sortValue, sortDirection) => {
    const {
      global: { sort, direction }
    } = this.props;
    let tempColor = {
      color
    };
    if (sort === sortValue && sortDirection === direction) {
      tempColor = {
        color: '#979797'
      };
    } else {
      tempColor = {
        color: '#d5d5d5'
      };
    }

    return tempColor;
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid
          container
          direction='row'
          spacing={0}
          className={classes.restaurantSort}
        >
          <Grid item xs={4} style={{ textAlign: 'left' }}>
            <IconButton
              color='inherit'
              onClick={evt => this.handleSort(evt, 'price', 'dsc')}
              className={classes.btnIcon}
            >
              <SvgIcon
                viewBox='0 0 16 18'
                style={this.getIconColor('price', 'dsc')}
              >
                <path d='M12 14H9V4H7v10H4l4 4 4-4zM0 0v2h16V0H0z' />
              </SvgIcon>
            </IconButton>
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'center' }}>
            Price
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'right' }}>
            <IconButton
              color='inherit'
              onClick={evt => this.handleSort(evt, 'price', 'asc')}
              className={classes.btnIcon}
            >
              <SvgIcon
                viewBox='0 0 16 18'
                style={this.getIconColor('price', 'asc')}
              >
                <path d='M4 4h3v10h2V4h3L8 0 4 4zM0 16v2h16v-2H0z' />
              </SvgIcon>
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          direction='row'
          spacing={0}
          className={classes.restaurantSort}
        >
          <Grid item xs={4} style={{ textAlign: 'left' }}>
            <IconButton
              color='inherit'
              onClick={evt => this.handleSort(evt, 'rate', 'dsc')}
              className={classes.btnIcon}
            >
              <SvgIcon
                viewBox='0 0 16 18'
                style={this.getIconColor('rate', 'dsc')}
              >
                <path d='M12 14H9V4H7v10H4l4 4 4-4zM0 0v2h16V0H0z' />
              </SvgIcon>
            </IconButton>
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'center' }}>
            Rate
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'right' }}>
            <IconButton
              color='inherit'
              onClick={evt => this.handleSort(evt, 'rate', 'asc')}
              className={classes.btnIcon}
            >
              <SvgIcon
                viewBox='0 0 16 18'
                style={this.getIconColor('rate', 'asc')}
              >
                <path d='M4 4h3v10h2V4h3L8 0 4 4zM0 16v2h16v-2H0z' />
              </SvgIcon>
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          direction='row'
          spacing={0}
          className={classes.restaurantDistanceSort}
        >
          <Grid item xs={4} style={{ textAlign: 'left' }}>
            <IconButton
              color='inherit'
              onClick={evt => this.handleSort(evt, 'distance', 'dsc')}
              className={classes.btnIcon}
            >
              <SvgIcon
                viewBox='0 0 16 18'
                style={this.getIconColor('distance', 'dsc')}
              >
                <path d='M12 14H9V4H7v10H4l4 4 4-4zM0 0v2h16V0H0z' />
              </SvgIcon>
            </IconButton>
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'center' }}>
            Distance
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'right' }}>
            <IconButton
              color='inherit'
              onClick={evt => this.handleSort(evt, 'distance', 'asc')}
              className={classes.btnIcon}
            >
              <SvgIcon
                viewBox='0 0 16 18'
                style={this.getIconColor('distance', 'asc')}
              >
                <path d='M4 4h3v10h2V4h3L8 0 4 4zM0 16v2h16v-2H0z' />
              </SvgIcon>
            </IconButton>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    global: state.global
  }),
  {
    updateSort,
    setCurrentLocation
  }
)(withStyles(styles)(Sort));
