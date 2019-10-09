import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Toolbar } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import styles from '../../styles/common';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import Filters from '../common/Filters';
import Button from '@material-ui/core/Button';
import { APP_URL } from '../../utils/config';
import actions from '../../redux/global/actions';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Sort from '../common/Sort';
import Fab from '@material-ui/core/Fab';
import { getQueryParams } from '../../utils/common';
import { stringify } from 'qs';

const {
  selectFilterTab,
  toggleFilterAccordion,
  clearSelectedFilters,
  selectedTagsIndex,
  selectedPriceRange,
  updateSort
} = actions;

function TabContainer(props) {
  return <Typography component='div'>{props.children}</Typography>;
}

const filterAccordion = {
  tags: 'Tags',
  priceRange: 'Price Range',
  distance: 'Distance To Me',
  searchBy: 'Search By'
};

class DrawerFilterMenu extends Component {
  state = {
    selectedDirection: '',
    clearFilter: false
  };

  handleFilterTabChange = (evt, selectedTab) => {
    evt.preventDefault();
    const {
      selectFilterTab,
      global: { selectedFilterTab }
    } = this.props;
    if (selectedTab != selectedFilterTab) {
      selectFilterTab(selectedTab);
    }
  };

  handleDrawerClose = () => {
    const {
      drawerClose,
      toggleFilterAccordion,
      global: { selectedFilterAccordion }
    } = this.props;
    if (selectedFilterAccordion) {
      toggleFilterAccordion({ selectedFilterAccordion: '' });
    } else {
      drawerClose();
    }
  };

  handleFilterClear = () => {
    const {
      clearSelectedFilters,
      global: { selectedFilterAccordion, selectedFilterTab },
      updateSort
    } = this.props;
    let tempFilterName = selectedFilterAccordion;
    let filterValue = '';
    if (selectedFilterAccordion) {
      if (selectedFilterAccordion === 'priceRange') {
        tempFilterName = 'price';
      } else if (selectedFilterAccordion === 'tags') {
        filterValue = [];
      } else if (selectedFilterAccordion === 'searchBy') {
        filterValue = 'Everywhere';
      } else if (selectedFilterAccordion === 'distance') {
        tempFilterName = 'distanceToMe';
      }
      clearSelectedFilters(tempFilterName, filterValue);
    } else if (selectedFilterTab === 1) {
      updateSort('', '');
    } else {
      window.location.href = `/restaurants`;
    }
  };

  handleSort = (sortValue, sortDirection) => {
    const { updateSort } = this.props;
    updateSort(sortValue, sortDirection);
  };

  handleSubmit = () => {
    const {
      global: {
        filters,
        searchBy,
        sort,
        direction,
        searchText,
        location: { lng, lat }
      }
    } = this.props;
    let response = getQueryParams({
      filters,
      searchBy,
      sort,
      direction,
      searchText,
      lng,
      lat
    });

    window.location.href = `/restaurants?${stringify(response, {
      encodeValuesOnly: true
    })}`;
  };

  render() {
    const {
      global: {
        drawerOpen,
        selectedFilterAccordion,
        selectedFilterTab,
        sort,
        direction
      },
      classes
    } = this.props;
    return (
      <React.Fragment>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='right'
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <AppBar
            color='primary'
            classes={{ colorPrimary: classes.filterDrawerHead }}
          >
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={this.handleDrawerClose}
                className={classes.drawerCloseButton}
              >
                <ArrowBack
                  color='primary'
                  classes={{
                    colorPrimary: classes.textColorPrimary,
                    root: classes.drawerClose
                  }}
                />
              </IconButton>
              {selectedFilterAccordion ? (
                <Typography
                  classes={{
                    root: classnames(
                      classes.textColorPrimary,
                      classes.filterLabelFont,
                      classes.filterTabsRoot
                    )
                  }}
                >
                  {filterAccordion[selectedFilterAccordion]}
                </Typography>
              ) : (
                <Tabs
                  value={selectedFilterTab}
                  onChange={this.handleFilterTabChange}
                  indicatorColor='primary'
                  variant='fullWidth'
                  classes={{
                    root: classes.filterTabsRoot
                  }}
                >
                  <Tab
                    textColor='primary'
                    classes={{
                      root: classnames(
                        classes.textColorPrimary,
                        classes.filterTabRoot
                      ),
                      textColorPrimary: classes.textColorPrimary,
                      selected: classes.tabSelected
                    }}
                    label='Filter'
                  />
                  <Tab
                    textColor='primary'
                    classes={{
                      root: classnames(
                        classes.textColorPrimary,
                        classes.filterTabRoot
                      ),
                      textColorPrimary: classes.textColorPrimary,
                      selected: classes.tabSelected
                    }}
                    label='Sort'
                  />
                </Tabs>
              )}
              <Button
                className={classes.filterClear}
                onClick={this.handleFilterClear}
              >
                Clear
              </Button>
            </Toolbar>
          </AppBar>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={0}
            className={classes.filterContainerMargin}
          >
            <SwipeableViews index={selectedFilterTab} style={{ width: '100%' }}>
              <TabContainer>
                <Filters />
              </TabContainer>
              <TabContainer>
                <Sort
                  sort={sort}
                  sortDirection={direction}
                  sortOnClick={this.handleSort}
                />
              </TabContainer>
            </SwipeableViews>
            <Grid item xs={12} className={classes.floatingFilterSubmit}>
              <div style={{ margin: '0 40px' }}>
                <Fab
                  size='medium'
                  className={classes.btnRaisedLightNormalRed}
                  onClick={this.handleSubmit}
                  style={{ width: '100%' }}
                >
                  View
                </Fab>
              </div>
            </Grid>
          </Grid>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    global: state.global
  }),
  {
    selectFilterTab,
    toggleFilterAccordion,
    clearSelectedFilters,
    selectedTagsIndex,
    selectedPriceRange,
    updateSort
  }
)(withStyles(styles)(DrawerFilterMenu));
