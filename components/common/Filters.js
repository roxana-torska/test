import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import styles from '../../styles/common';
import { Grid } from '@material-ui/core';
import classnames from 'classnames';
import RoomIcon from '@material-ui/icons/Room';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import CustomMultiSelectList from '../customMultiSelectList/customMultiSelectList';
import { tagAPI } from '../../services/TagAPI';
import { restaurantAPI } from '../../services/restaurantAPI';
import {
  veganIcon,
  kosherIcon,
  glutenFreeIcon,
  fishIcon,
  vegetarianIcon,
  meatIcon,
  milkIcon,
  halalIcon
} from '../customIcon/customIcon';
import Router from 'next/router';
import { stringify } from 'qs';
import { APP_URL } from '../../utils/config';
import Button from '@material-ui/core/Button';
import actions from '../../redux/global/actions';
import { connect } from 'react-redux';
import { globalAPI } from '../../services/globalAPI';
import PriceRangeList from '../common/priceRangeList';
import Fab from '@material-ui/core/Fab';
import { getQueryParams } from '../../utils/common';

const {
  toggleFilterAccordion,
  updateSelectedFilterItem,
  updateSelectedRestaurantCount,
  setCurrentLocation
} = actions;

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    width: '100%'
  },
  expanded: {
    margin: 'auto'
  }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)'
  },
  expanded: {}
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: '0px'
  }
}))(MuiExpansionPanelDetails);

const tagIcons = {
  vegan: veganIcon,
  kosher: kosherIcon,
  glutenfree: glutenFreeIcon,
  fish: fishIcon,
  vegetarian: vegetarianIcon,
  meat: meatIcon,
  milk: milkIcon,
  halal: halalIcon
};

class Filters extends React.Component {
  state = {
    tags: '',
    priceRange: [],
    searchByData: [],
    distanceData: []
  };

  componentDidMount() {
    const {
      global: { searchText, filters }
    } = this.props;
    Promise.all([
      tagAPI.getTags({ searchText, filters }),
      globalAPI.getPriceRange({ searchText, filters }),
      globalAPI.getSearchBy({ searchText, filters })
    ]).then(result => {
      let tags = result[0].map(tag => {
        return {
          id: tag._id,
          primary: tag.name,
          totalCount: tag.restCount + tag.dishCount
        };
      });
      let priceRange = result[1].map((price, index) => {
        return {
          primary: price.value,
          unit: price.unit,
          totalCount: price.totalCount
        };
      });
      let searchByData = [
        {
          primary: 'Restaurants',
          unit: '',
          totalCount: result[2].restaurantsCount
        },
        {
          primary: 'Dishes',
          unit: '',
          totalCount: result[2].dishesCount
        },
        {
          primary: 'Everywhere',
          unit: '',
          totalCount: result[2].totalCount
        }
      ];
      this.setState({ tags, priceRange, searchByData });
    });
  }

  handleChange = panel => (event, expanded) => {
    const {
      toggleFilterAccordion,
      global: { location }
    } = this.props;
    toggleFilterAccordion({ selectedFilterAccordion: expanded ? panel : '' });
    if (panel === 'distance') {
      if (!location.lng && !location.lat) {
        this.getLocationPermission();
      } else {
        this.getDistanceFilter({ ...location });
      }
    }
  };
  getDistanceFilter = pos => {
    globalAPI.getDistance(pos).then(response => {
      console.log('response', response);
      let distanceData = response.map(rec => {
        return {
          primary: rec.value + ' ' + rec.unit,
          unit: '',
          totalCount: rec.totalCount
        };
      });
      console.log('distance', distanceData);
      this.setState({ distanceData });
    });
  };

  handleMultiListItemClick = (listName, selectedItem, totalCount) => {
    const { updateSelectedFilterItem } = this.props;

    updateSelectedFilterItem(listName, {
      filterValue: selectedItem
    });
  };

  handlePriceRange = (priceRange, totalCount) => {
    const { updateSelectedFilterItem } = this.props;
    updateSelectedFilterItem('price', {
      filterValue: priceRange
    });
  };

  handleSearchBy = (searchByValue, totalCount) => {
    const {
      updateSelectedFilterItem,
      global: { searchBy }
    } = this.props;
    if (searchByValue === searchBy) {
      searchByValue = 'restaurants';
    }
    updateSelectedFilterItem('searchBy', {
      filterValue: searchByValue
    });
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
          this.getDistanceFilter(pos);
        },
        () => {
          setCurrentLocation(location);
          console.log('no location access');
        }
      );
    } else {
      setCurrentLocation(location);
      // Browser doesn't support Geolocation
      console.log('no location access');
    }
  };

  handleDistance = (distance, totalCount) => {
    const { updateSelectedFilterItem } = this.props;
    let tempDistance = distance.split(' ');
    tempDistance = tempDistance[0] + '-' + tempDistance[1];
    updateSelectedFilterItem('distanceToMe', {
      filterValue: tempDistance,
      totalCount
    });
  };

  getSelectedDistance = selected => {
    let tempDistance = selected.split('>');
    if (tempDistance[0] === '') {
      tempDistance = selected.split('-');
      tempDistance = tempDistance[0] + ' ' + tempDistance[1];
    } else {
      tempDistance = selected.split('-');
      tempDistance =
        tempDistance[0] + '-' + tempDistance[1] + ' ' + tempDistance[2];
    }
    return tempDistance;
  };

  getTotalFilterCount = (filterName, filterData) => {
    const {
      global: { filters }
    } = this.props;
    let totalCount = null;
    if (filterData.length == 0) return 'all';
    if (filterName === 'tags') {
      if (filters.tags.length) {
        filterData.map(rec => {
          if (filters.tags.includes(rec.primary)) {
            totalCount += rec.totalCount;
          }
        });
      } else {
        totalCount = 'all';
      }
    } else if (filterName === 'price') {
      if (filters.price) {
        filterData.map(rec => {
          if (filters.price === rec.primary) {
            totalCount += rec.totalCount;
          }
        });
      } else {
        totalCount = 'all';
      }
    } else if (filterName === 'searchBy') {
      if (filters.searchBy) {
        filterData.map(rec => {
          if (filters.searchBy === rec.primary) {
            totalCount = rec.primary;
          }
        });
      } else {
        totalCount = 'Everywhere';
      }
    } else {
      totalCount = null;
    }

    return totalCount;
  };

  render() {
    const { tags, priceRange, searchByData, distanceData } = this.state;
    const {
      classes,
      global: { selectedFilterAccordion, filters }
    } = this.props;
    console.log("tags=====>", tags)
    console.log("search by data =====>", searchByData);
    console.log("priceRange", priceRange);
    return (
      <React.Fragment>
        <ExpansionPanel
          square
          expanded={selectedFilterAccordion === 'tags'}
          onChange={this.handleChange('tags')}
        >
          <ExpansionPanelSummary>
            <Grid container direction='row' spacing={0}>
              <Grid item xs={10}>
                Tags
              </Grid>
              <Grid item xs={2} className={classes.filterRestaurantCount}>
                ({this.getTotalFilterCount('tags', tags)})
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {tags.length ? (
              <CustomMultiSelectList
                listData={tags}
                listItemClass={classes.listMultiItem}
                multiListItemClick={this.handleMultiListItemClick}
                selected={Array.from(filters.tags)}
              />
            ) : (
                ''
              )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={selectedFilterAccordion === 'priceRange'}
          onChange={this.handleChange('priceRange')}
        >
          <ExpansionPanelSummary>
            <Grid container direction='row' spacing={0}>
              <Grid item xs={10}>
                Price range
              </Grid>
              <Grid item xs={2} className={classes.filterRestaurantCount}>
                ({this.getTotalFilterCount('price', priceRange)})
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {priceRange.length ? (
              <PriceRangeList
                listData={priceRange}
                listItemClass={classes.listMultiItem}
                listItemClick={this.handlePriceRange}
                selected={filters.price + ''}
              />
            ) : (
                ''
              )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={selectedFilterAccordion === 'distance'}
          onChange={this.handleChange('distance')}
        >
          <ExpansionPanelSummary>
            <Grid container direction='row' spacing={0}>
              <Grid item xs={10}>
                Distance to me
              </Grid>
              <Grid item xs={2} className={classes.filterRestaurantCount}>
                <RoomIcon />
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {distanceData.length ? (
              <PriceRangeList
                listData={distanceData}
                listItemClass={classes.listMultiItem}
                listItemClick={this.handleDistance}
                selected={this.getSelectedDistance(filters.distanceToMe)}
              />
            ) : (
                'No restaurants and dishes found in your region'
              )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={selectedFilterAccordion === 'searchBy'}
          onChange={this.handleChange('searchBy')}
        >
          <ExpansionPanelSummary>
            <Grid container direction='row' spacing={0}>
              <Grid item xs={10}>
                Search by
              </Grid>
              <Grid item xs={2} className={classes.filterRestaurantCount}>
                ({this.getTotalFilterCount('searchBy', searchByData)})
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {searchByData.length ? (
              <PriceRangeList
                listData={searchByData}
                listItemClass={classes.listMultiItem}
                listItemClick={this.handleSearchBy}
                selected={filters.searchBy + ''}
              />
            ) : (
                ''
              )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    global: state.global
  }),
  {
    toggleFilterAccordion,
    updateSelectedFilterItem,
    updateSelectedRestaurantCount,
    setCurrentLocation
  }
)(withStyles(styles)(Filters));
