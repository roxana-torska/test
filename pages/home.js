import React, { Component } from 'react'
import { connect } from 'react-redux'
import WindowResizeListener from "react-window-size-listener";
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/common';
import RestaurantLayout from '../components/layouts/RestaurantLayout';
import { Grid } from '@material-ui/core';
import { reviewAPI } from '../services/reviewAPI';
import { css } from 'emotion';
import SectionHeaders from '../components/common/SectionHeaders';
import NewDishCard from '../components/common/NewDishCard';
import RestaurantsCard from '../components/common/RestaurantsCard';
import { restaurantAPI } from '../services/restaurantAPI';
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
    componentDidMount = () => {
        reviewAPI.getLatestReview().then(res => this.setState({
            data: res
        }))
        restaurantAPI.getDishesWithTags().then(res => {
            console.log(res);
        })
    }
    render() {

        const { currentRestaurent, classes } = this.props;
        let avatar = '/static/imgs/image-not-found-dark.png';

        console.log("curent restaurents", currentRestaurent && currentRestaurent[0]);
        const { isHomePage } = this.state;
        return <React.Fragment>
            <RestaurantLayout
                selectedPageTab={0}
                toggleMenu={this.handleToggleMenu}
                changeOverlay={this.handleOverlay}
                isHomePage={isHomePage}
            >
                <WindowResizeListener
                    onResize={windowSize => {
                        this.setState({ winHeight: windowSize.windowHeight });
                    }}
                />
                {/* main container */}
                <div style={{
                    margin: "5px 10px 5px 10px",

                }}>
                    <Grid container direction="column">
                        {/* best around you container */}
                        <Grid item container direction="column">
                            {<SectionHeaders text="best around you" value="45" />}
                            <Grid container direction="row">
                                <div className={
                                    css`
                                    display:flex;
                                    flex-direction:row;
                                    overflow-x: scroll;
                                    width:100%;
                                    margin-bottom:20px;
                                    padding-bottom:20px;
                                    // height:200px;

                                    `

                                }>


                                    {[1, 2, 4, 3, 4, "d", 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2].map(rec => <NewDishCard classes={classes}

                                        name="BURGERS" des="13 dishes" />)}

                                </div>
                            </Grid>
                            {<SectionHeaders text="Resturants around you" value="45" />}
                            <Grid item container direction="row"> {[1, 2, 3].map(rec => <RestaurantsCard />)}</Grid>
                            {<SectionHeaders text="Lastest reviews" value="10" />}
                            <Grid container direction="row">
                                <div className={
                                    css`
                                    display:flex;
                                    flex-direction:row;
                                    overflow-x: scroll;
                                    width:100%;
                                    margin-bottom:20px;
                                    padding-bottom:20px;
                                    // height:200px;

                                    `

                                }>


                                    {[1, 2, 4, 3, 4, "d", 2, 3, 4, 3, 2].map(rec => <NewDishCard

                                        name="DISH FULL NAME"
                                        des="Meesa"
                                        review="2.5"
                                        classes={classes} />)}

                                </div>
                            </Grid>
                            {<SectionHeaders text="top 10" />}
                            <Grid container direction="row">
                                <div className={
                                    css`
                                    display:flex;
                                    flex-direction:row;
                                    overflow-x: scroll;
                                    width:100%;
                                    margin-bottom:20px;
                                    padding-bottom:20px;
                                    // height:200px;

                                    `

                                }>


                                    {[1, 2, 4, 3, 4, "d", 2, 3, 4, 3, 2].map(rec => <NewDishCard

                                        name="DISH FULL NAME"
                                        des="Meesa"
                                        review="2.5"
                                        classes={classes} />)}

                                </div>
                            </Grid>


                        </Grid>



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
    currentRestaurent: state.RestaurantsReducer.currentRestaurent,
}),
    {
        // toggleFilterMenu,
        // updateStoreWithQuery,
        // selectFilterTab,
        // showHideMenu
    })(withStyles(styles)(Home))