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
import * as _ from 'lodash'
class RestaurantDetails extends Component {
    state = {
        isDishDetails: true,
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
        let list = this.props.currentRestaurent[0].open_days.map((rec) => {


            return { rec: this.props.currentRestaurent[0].opening_hours[rec] }

        });
        var result = _(list)
            .groupBy(x => x)
            .map((value, key) => ({
                time: value,
                index: key,
            }))
            .value();
        console.log("result opening hour===>", result);
    }
    render() {

        const { currentRestaurent } = this.props;
        let avatar = '/static/imgs/image-not-found-dark.png';
        // const { name, images } = currentRestaurent && currentRestaurent[0].restaurant[0];
        console.log("curent restaurents", currentRestaurent);
        const { isDishDetails } = this.state;
        return <React.Fragment>
            <RestaurantLayout
                selectedPageTab={0}
                toggleMenu={this.handleToggleMenu}
                changeOverlay={this.handleOverlay}
                restaurantsName={currentRestaurent ? currentRestaurent[0].restaurant.name : ""}
                isDishDetails={isDishDetails}
            >
                <WindowResizeListener
                    onResize={windowSize => {
                        this.setState({ winHeight: windowSize.windowHeight });
                    }}
                />
                {currentRestaurent && <Grid container direction="row">
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <div style={{
                            width: "80%",

                            marginRight: "10%",
                            marginLeft: "10%",
                        }}>
                            <img src={avatar} width="100%" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} container direction="column">
                        <div style={{
                            marginLeft: "10%",
                            marginRight: "10%",
                        }}>
                            <Grid container direction="column">
                                <Grid item>
                                    <div style={{
                                        marginTop: "20px",
                                        marginBottom: "14px"
                                    }}>
                                        <LocationIcon /><Typography style={{
                                            display: "inline-block",
                                            verticalAlign: "top",
                                            marginLeft: "20px",
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "normal",
                                            fontSize: "15px",
                                            lineHeight: "24px",
                                            color: "#4A4A4A"
                                        }}>
                                            {currentRestaurent[0].address}
                                        </Typography>

                                    </div>
                                </Grid>
                                <Divider />
                                <Grid item>
                                    <div style={{
                                        marginTop: "20px",
                                        marginBottom: "14px"
                                    }}>
                                        <PhoneIcon /><Typography style={{
                                            display: "inline-block",
                                            verticalAlign: "top",
                                            marginLeft: "20px",
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "normal",
                                            fontSize: "15px",
                                            lineHeight: "24px",
                                            color: "#4A4A4A"
                                        }}>
                                            {currentRestaurent[0].phone || +923039276862}
                                        </Typography>

                                    </div>
                                    <Divider />
                                </Grid>

                                <Grid item>
                                    <div style={{
                                        marginTop: "20px",
                                        marginBottom: "14px"
                                    }}>
                                        <WorldWideIcon /><Typography style={{
                                            display: "inline-block",
                                            verticalAlign: "top",
                                            marginLeft: "20px",
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "normal",
                                            fontSize: "15px",
                                            lineHeight: "24px",
                                            color: "#4A4A4A"
                                        }}>
                                            {currentRestaurent[0].webUrl || "https://www.dishin.com"}
                                        </Typography>

                                    </div>

                                </Grid>
                                <Divider />

                                <Grid item>
                                    <div style={{
                                        marginTop: "20px",
                                        marginBottom: "14px"
                                    }}>
                                        <ClockIcon />

                                    </div>

                                </Grid>
                                <Divider />
                            </Grid>
                        </div>
                    </Grid>



                </Grid>



                }

                <Grid item xs={12} sm={12} md={12} >
                    <div style={{
                        background: "#F7F7F7",
                        width: "80%",
                        marginRight: "10%",
                        marginTop: "20px",
                        marginLeft: "10%",

                    }}>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"


                        >

                            <Grid item xs={3} sm={4} md={4} lg={4}
                                container
                                justify="center"
                                alignItems="center">
                                <div style={{

                                    margin: "10px 20px",

                                }}>
                                    <ReservedIcon />
                                </div>
                                <Typography>
                                    Reserve
                                </Typography>
                            </Grid>
                            <Grid item xs={3} sm={4} md={4} lg={4}
                                container
                                justify="center"
                                alignItems="center"


                            >
                                <div style={{

                                    margin: "10px 20px",

                                }}>
                                    <ReviewsIcon />
                                </div>
                                <Typography>
                                    Reviews
                                </Typography>
                            </Grid>
                            <Grid item xs={3} sm={4} md={4} lg={4}
                                container
                                justify="center"
                                alignItems="center"

                            >
                                <div style={{

                                    margin: "10px 20px",

                                }}> <MenusIcon /></div><Typography >
                                    Menus
                                </Typography>
                            </Grid>

                        </Grid>
                    </div>
                </Grid>
                <Grid>
                    {this.state.data.length > 0 && <ReviewCard data={this.state.data} />}

                </Grid>

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
    })(RestaurantDetails);