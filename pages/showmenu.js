import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RestaurantLayout from '../components/layouts/RestaurantLayout';
import styles from '../styles/common';
import { APP_URL, API_IMAGE_URL } from '../utils/config';

import { Scrollbars } from 'react-custom-scrollbars';
import RestaurantList from '../components/restaurantLists/RestaurantList';
import SpeedDials from '../components/menu/FloatingActionMenu';
import actions from '../redux/global/actions';
import { connect } from 'react-redux';
import SponsoredRestaurantsList from '../components/restaurantLists/sponsoredRestaurantsLists';
import DishesList from '../components/restaurantLists/dishLists';
import NotFound from '../components/notFound/notFound';
import WindowResizeListener from 'react-window-size-listener';
import Slide from '@material-ui/core/Slide';
import * as _ from 'lodash';
import { getLocation } from '../utils/common';
const {
    toggleFilterMenu,
    updateStoreWithQuery,
    selectFilterTab,
    showHideMenu
} = actions;

function Transition(props) {
    return <Slide direction='down' {...props} />;
}
class showmenu extends React.Component {
    static async getInitialProps ({ query: { restaurantsName } }) {
        
        return { restaurantsName: restaurantsName }
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
        if (value.type === 'restaurant') {
            
            window.location.href = `/restaurants/${value.slug}`;
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
            restaurantsName,
          } = this.props;
      
        return (
            <RestaurantLayout
                selectedPageTab={0}
                toggleMenu={this.handleToggleMenu}
                changeOverlay={this.handleOverlay}
                restaurantsName={restaurantsName}
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

                    <Grid item xs={12}>
                        <SponsoredRestaurantsList
                            listItemOnClick={this.handleListItemClick}
                            listData={sponsoredRestaurants}
                            listItemClass={classes.restaurantsListItem}
                        />
                    </Grid>


                </Grid>
            </RestaurantLayout>
        );
    }
}

export default connect(
    state => ({
        global: state.global.toJSON()
    }),
    {
        toggleFilterMenu,
        updateStoreWithQuery,
        selectFilterTab,
        showHideMenu
    }
)(withStyles(styles)(showmenu));
