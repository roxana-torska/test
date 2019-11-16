import React, { Component } from 'react'
import { connect } from 'react-redux'
import WindowResizeListener from "react-window-size-listener";
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/common';
import RestaurantLayout from '../components/layouts/RestaurantLayout';
import { Grid } from '@material-ui/core';
import { css } from 'emotion';
import NewDishCard from '../components/common/NewDishCard';
const { API_IMAGE_URL } = require('../utils/config');

class Home extends Component {
    state = {
        isHomePage: true,
        data: [],
    }
    handleOverlay = value => {
        this.setState({ overlay: !value });
    };
    handleToggleMenu = toggleMenu => {
        const { toggleFilterMenu } = this.props;
        toggleFilterMenu({ drawerOpen: toggleMenu });
    };


    render() {


        const { currentRestaurent, classes, latestReviews, dishesWithTags, topten } = this.props;


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
                    <Grid container
                        justify="center"
                        alignItems="center"
                        direction="row">
                        {/* best around you container */}
                        {dishesWithTags != null && dishesWithTags.length > 0 && dishesWithTags.map(rec => <Grid item xs={5}

                        >

                            <NewDishCard classes={classes}

                                name={rec.tag} des={rec.dishes.length + " dishes"}
                                url={API_IMAGE_URL + "/assets/images/tags/" + rec.dishes[0].tag.url}
                                type="dishes"
                            /></Grid>)}


                    </Grid>
                </div>


            </RestaurantLayout>
        </React.Fragment >


    }

}


export default connect(state => ({
    global: state.global,
    restaurants: state.RestaurantsReducer.restaurants,
    topten: state.RestaurantsReducer.dishes && state.RestaurantsReducer.dishes.sort((a, b) => (a.avgRatings < b.avgRatings ? 1 : -1)),
    currentRestaurent: state.RestaurantsReducer.currentRestaurent,
    dishesWithTags: state.RestaurantsReducer.dishesWithTags,
    latestReviews: state.RestaurantsReducer.latestReviews,

}),
    {
        // toggleFilterMenu,
        // updateStoreWithQuery,
        // setLatestReviews,
        // setDishesWithTags
    })(withStyles(styles)(Home))