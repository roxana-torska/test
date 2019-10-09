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
import CustomInput from '../customInput/CustomInput';
import validator from '../../utils/validator';
import { globalAPI } from '../../services/globalAPI';
import notify from '../../utils/notifier';
import WindowResizeListener from 'react-window-size-listener';

const { updateSort, updateStoreWithQuery } = actions;

let newSearchColor = '#f2f2f2a3';
let contributeColor = '#f2f2f2a3';
class NotFound extends Component {
  validators = {
    restaurantName: {
      required: { message: 'Please enter restaurant name' },
      validLength: { length: 50 },
      maxLength: {
        length: 50,
        message: 'Restaurant name should be 50 characters long'
      }
    },
    dishName: {
      required: { message: 'Please enter dish name' },
      validLength: { length: 50 },
      maxLength: {
        length: 50,
        message: 'Dish name should be 50 characters long'
      }
    },
    city: {
      required: { message: 'Please enter city' },
      validLength: { length: 20 },
      maxLength: { length: 20, message: 'City should be 20 characters long' }
    },
    dishScore: {
      required: { message: 'Please enter dish score' },
      minValue: {
        value: 1,
        message: 'Dish score should be greater then equal to 1'
      },
      maxValue: {
        value: 10,
        message: 'Dish score should be less then equal to 10'
      }
    }
  };
  state = {
    showContribute: false,
    restaurantName: '',
    dishName: '',
    city: '',
    dishScore: '',
    restaurantNameError: false,
    dishNameError: false,
    cityError: false,
    dishScoreError: false,
    restaurantNameErrorMessage: '',
    dishNameErrorMessage: '',
    cityErrorMessage: '',
    dishScoreErrorMessage: '',
    winHeight: '100vh'
  };

  handleNewSearch = () => {
    newSearchColor = '#ececec';
    window.location.href = `/restaurants`;
  };

  handleContribute = () => {
    contributeColor = '#ececec';
    const {
      global: { isLoggedIn }
    } = this.props;
    if (!isLoggedIn) {
      window.location.href = `/sign-in?redirect=${escape(
        window.location.href
      )}`;
    }
    this.setState({ showContribute: true });
  };

  handleFieldChange = (name, value, notSetValue) => {
    notSetValue = notSetValue || false;
    const fieldError = validator(value, this.validators[name]);
    let state = null;
    if (notSetValue === false) {
      state = {};
      state[`${name}Error`] = false;
      state[`${name}ErrorMessage`] = '';
      if (fieldError.helper) {
        state[`${name}Error`] = true;
        state[`${name}ErrorMessage`] = fieldError.helperMessage;
      }
      state[name] = value;
    }
    if (fieldError.error === true) {
      state = state || {};
      state[`${name}Error`] = true;
      state[`${name}ErrorMessage`] = fieldError.errorMessage;
    }

    if (state) {
      this.setState(state);
    }
    return fieldError.error;
  };

  handleSubmit = () => {
    if (this.validateForm()) {
      const { restaurantName, dishName, city, dishScore } = this.state;
      const {
        global: { user }
      } = this.props;
      globalAPI
        .addContributeData({
          userId: user.user_id,
          restaurantName,
          dishName,
          city,
          dishScore
        })
        .then(response => {
          if (response.status.toLowerCase() === 'ok') {
            notify('Thanks for your valuable contribution');
            window.location.href = `/restaurants`;
          }
        });
    } else {
      console.log('validation failed');
    }
  };

  validateForm = () => {
    const result = Object.keys(this.validators).map(field => {
      return this.handleFieldChange(field, this.state[field], true);
    });
    return !result.includes(true);
  };

  render() {
    const {
      classes,
      global: { searchText }
    } = this.props;
    const {
      showContribute,
      restaurantNameError,
      restaurantNameErrorMessage,
      dishNameError,
      dishNameErrorMessage,
      cityError,
      cityErrorMessage,
      dishScoreError,
      dishScoreErrorMessage,
      winHeight
    } = this.state;
    let rootHeight = showContribute ? winHeight - 100 : 190;
    return (
      <React.Fragment>
        <WindowResizeListener
          onResize={windowSize => {
            this.setState({ winHeight: windowSize.windowHeight });
          }}
        />
        <form className={classes.container} onSubmit={this.handleSubmit}>
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
            <Grid item>{'  '}</Grid>
            <Grid item style={{ textAlign: 'center' }}>
              <div className={classes.notFoundHeading}>
                {' '}
                We didn't find {searchText} :(
              </div>
              <div className={classes.notFoundDesc}>
                {' '}
                Would you like to contribute and add them to Dishin?
              </div>
            </Grid>
            <Grid item style={{ textAlign: 'right' }} style={{ width: '100%' }}>
              <div>
                <Grid container direction='row'>
                  <Grid
                    item
                    xs={6}
                    style={{ textAlign: 'right', paddingRight: '10px' }}
                  >
                    <Button
                      className={classes.filterClear}
                      onClick={this.handleNewSearch}
                      style={{
                        backgroundColor: newSearchColor
                      }}
                      classes={{
                        label: classes.labelCapitalTransform
                      }}
                    >
                      New Search
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      className={classes.filterClear}
                      onClick={this.handleContribute}
                      style={{
                        backgroundColor: contributeColor
                      }}
                      classes={{
                        label: classes.labelCapitalTransform
                      }}
                    >
                      Contribute
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {showContribute ? (
              <React.Fragment>
                <Grid item style={{ width: '100%' }}>
                  <CustomInput
                    id='restaurantName'
                    label='Restaurant Name'
                    error={restaurantNameError}
                    helperText={<span>{restaurantNameErrorMessage}</span>}
                    onChange={event =>
                      this.handleFieldChange(
                        'restaurantName',
                        event.target.value
                      )
                    }
                    fullWidth
                  />
                  <CustomInput
                    id='dishName'
                    label='Dish Name'
                    error={dishNameError}
                    helperText={<span>{dishNameErrorMessage}</span>}
                    onChange={event =>
                      this.handleFieldChange('dishName', event.target.value)
                    }
                    fullWidth
                  />
                  <CustomInput
                    id='city'
                    label='City'
                    error={cityError}
                    helperText={<span>{cityErrorMessage}</span>}
                    onChange={event =>
                      this.handleFieldChange('city', event.target.value)
                    }
                    fullWidth
                  />
                  <CustomInput
                    id='dishScore'
                    label='Dish Score from 1 to 10'
                    type='number'
                    error={dishScoreError}
                    helperText={<span>{dishScoreErrorMessage}</span>}
                    onChange={event =>
                      this.handleFieldChange('dishScore', event.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <div style={{ margin: '0 40px' }}>
                    <Button
                      size='medium'
                      className={classes.btnRaisedLightNormalRed}
                      fullWidth
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </Grid>
              </React.Fragment>
            ) : (
              ''
            )}
          </Grid>
        </form>
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
    updateStoreWithQuery
  }
)(withStyles(styles)(NotFound));
