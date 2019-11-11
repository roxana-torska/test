import React, { Component } from 'react'
import { connect } from 'react-redux'
import WindowResizeListener from "react-window-size-listener";
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/common';
import RestaurantLayout from '../components/layouts/RestaurantLayout';
import { Grid, Divider, Typography } from '@material-ui/core';
import LocationIcon from '../components/customIcon/LocationIcon';
import PhoneIcon from '../components/customIcon/PhoneIcon';
import WorldWideIcon from '../components/customIcon/WorldWideIcon';
import ClockIcon from '../components/customIcon/ClockIcon';
import ReservedIcon from '../components/customIcon/ReservedIcon';
import ReviewsIcon from '../components/customIcon/ReviewsIcon';
import MenusIcon from '../components/customIcon/MenusIcon';
import { reviewAPI } from '../services/reviewAPI';
import ReviewCard from '../components/review/ReviewCard';
import { css } from 'emotion';
import SectionHeaders from '../components/common/SectionHeaders';
import NewDishCard from '../components/common/NewDishCard';
import RestaurantsCard from '../components/common/RestaurantsCard';
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
    }
    render() {

        const { currentRestaurent } = this.props;
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


                                    {[1, 2, 4, 3, 4, "d", 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2].map(rec => <NewDishCard />)}

                                </div>
                            </Grid>
                            {<SectionHeaders text="Resturants around you" value="45" />}
                            {[1, 2, 3].map(rec => <RestaurantsCard />)}
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


                                    {[1, 2, 4, 3, 4, "d", 2, 3, 4, 3, 2].map(rec => <NewDishCard />)}

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
    })(Home);