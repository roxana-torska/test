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
                            {<SectionHeaders />}
                            <Grid item container direction="row">
                                <Grid item xs={4} sm={4} md={4}>


                                    <div className={
                                        css`
                                    background: #FFFFFF;
                                    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
                                    border-radius: 2px;
                                    width:80%;
                                    margin-top:10px;
                                    `
                                    }>
                                        <img src="/static/imgs/burger.jpg"

                                            width="100%" />
                                        <Typography
                                            className={
                                                css`
                                            font-family: Lato;
                                            font-style: normal;
                                            font-weight: bold;
                                            font-size: 18px;
                                            line-height: 16px;
                                            /* identical to box height, or 89% */

                                            display: flex;
                                            align-items: flex-end;

                                            color: #4A4A4A;
                                            `
                                            }

                                        >
                                            Burgers

                                        </Typography>

                                    </div>
                                </Grid>

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