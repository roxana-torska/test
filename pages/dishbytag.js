import React, { Component } from 'react'
import { connect } from 'react-redux'
import WindowResizeListener from "react-window-size-listener";
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/common';
import RestaurantLayout from '../components/layouts/RestaurantLayout';
import { Grid } from '@material-ui/core';
import { css } from 'emotion';
import NewDishCard from '../components/common/NewDishCard';
import DishesList from '../components/restaurantLists/dishLists';

import restaurantsAction from '../redux/restaurants/actions'
const { setCustumDishes } = restaurantsAction;
const { API_IMAGE_URL } = require('../utils/config');

class DishesByTags extends Component {
    state = {
        isHomePage: true,
        data: [],
        dishData: [],
    }
    handleOverlay = value => {
        this.setState({ overlay: !value });
    };
    handleToggleMenu = toggleMenu => {
        const { toggleFilterMenu } = this.props;
        toggleFilterMenu({ drawerOpen: toggleMenu });
    };
    handleClick = (tag) => {
        const { dishesWithTags, dishes } = this.props;
        let filtered = dishesWithTags.filter(rec => rec.tag == tag)
        if (filtered.length > 0) {
            filtered = filtered[0].dishes.map(rec => dishes.find((rec1) => rec1._id == rec._id))
        }
        this.props.setCustumDishes(filtered);
    }
    handleListItemClick = (evt, index, value) => {
        console.log("valueeeeeeeeeeeeeeeeeeeeeeeee=>", value)
        if (value.type === 'restaurant') {

            window.location.href = `/restaurants/${value.slug}`;
        }
        if (value.type === 'dish') {
            // window.location.href = `/dish-details?id=${value.slug}&name=${value.primary}`;
            // window.location.href = `/dish-details/${value.slug}`;
        }
    };
    handleReviewSubmit = () => {
        this.setState({ openDialog: true });
    };

    render() {


        const { classes, dishesWithTags, custumDishes } = this.props;
        const { dishData } = this.state;

        console.log(dishData);

        console.log(dishesWithTags);

        const { isHomePage, data } = this.state;
        return <React.Fragment>
            <RestaurantLayout
                selectedPageTab={0}
                toggleMenu={this.handleToggleMenu}
                changeOverlay={this.handleOverlay}
                isHomePage={true}
                isDishDetails={true}
                restaurantsName="BEST AOUND YOU"
            >
                <WindowResizeListener
                    onResize={windowSize => {
                        this.setState({ winHeight: windowSize.windowHeight });
                    }}
                />
                {/* main container */}
                <div style={{
                    margin: "5px 0px 10px 0px",

                }}>
                    <Grid item xs={12}>
                        <DishesList
                            listItemOnClick={this.handleListItemClick}
                            listData={custumDishes}
                            listItemClass={classes.restaurantsListItem}
                            changeOverlay={this.handleOverlay}
                            // restaurantsName={restaurant ? restaurant.primary : id}
                            // isLoggedIn={isLoggedIn}
                            onReviewSubmit={this.handleReviewSubmit}
                        />

                    </Grid>
                </div>


            </RestaurantLayout>
        </React.Fragment >


    }

}


export default connect(state => ({
    global: state.global,
    restaurants: state.RestaurantsReducer.restaurants,
    dishes: state.RestaurantsReducer.dishes,
    topten: state.RestaurantsReducer.dishes && state.RestaurantsReducer.dishes.sort((a, b) => (a.avgRatings < b.avgRatings ? 1 : -1)),
    currentRestaurent: state.RestaurantsReducer.currentRestaurent,
    custumDishes: state.RestaurantsReducer.custumDishes,
    latestReviews: state.RestaurantsReducer.latestReviews,

}),
    {
        // toggleFilterMenu,
        // updateStoreWithQuery,
        // setLatestReviews,
        setCustumDishes
    })(withStyles(styles)(DishesByTags))