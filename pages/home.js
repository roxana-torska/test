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
import restaurantsAction from '../redux/restaurants/actions'
import moment from 'moment';
import { restaurantAPI } from '../services/restaurantAPI';
import DishesList from '../components/restaurantLists/dishLists';
const { API_IMAGE_URL } = require('../utils/config');


const { setDishesWithTags, setLatestReviews } = restaurantsAction;
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
        Promise.all([
            reviewAPI.getLatestReview(),
            restaurantAPI.getDishesWithTags(),
            restaurantAPI.getRestaurentsWithNumberOfReview()
        ]).then(
            res => {
                this.props.setDishesWithTags(res[1]);
                this.props.setLatestReviews(res[0]);
                this.setState({
                    data: res[2]
                })

            }

        )

    }
    getCurrentDate = (opening, closing) => {
        console.log(opening);
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        let day = weekday[d.getDay()];
        let openingHour = opening[day][0];
        let closingHour = closing[day][0];
        console.log(openingHour);
        console.log(closingHour);

        var format = 'hh:mm';
        var time = moment(d.getHours() + ":" + d.getMinutes(), format);
        var beforeTime = moment(openingHour, format)
        var afterTime = moment(closingHour, format)
        //  target = LocalTime.parse( "01:00:00" ) ;
        if (time.isBetween(beforeTime, afterTime)) {
            return true
        } else {
            return false;

        }

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


        const { currentRestaurent, classes, latestReviews, dishesWithTags, topten, dishes } = this.props;
        console.log("top ten ===>", topten);
        let avatar = '/static/imgs/image-not-found-dark.png';
        console.log("curent restaurents", currentRestaurent && currentRestaurent[0]);

        const { isHomePage, data } = this.state;

        console.log("data===>", data);
        console.log("dishes ====>", dishesWithTags);
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
                            {dishesWithTags != null && dishesWithTags.length > 0 && <SectionHeaders text="best around you" value={dishesWithTags.length} />}
                            {dishesWithTags != null && dishesWithTags.length > 0 && <Grid container direction="row">
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
                                    {dishesWithTags.map(rec => <NewDishCard classes={classes}

                                        name={rec.tag} des={rec.dishes.length + " dishes"}
                                        url={API_IMAGE_URL + "/assets/images/tags/" + rec.dishes[0].tag.url}
                                        type="dishes"
                                    />)}

                                </div>
                            </Grid>}
                            {<SectionHeaders text="Resturants around you" value={data && data.length} />}
                            {data && data.length > 0 && <Grid item container direction="row">
                                {data.map(rec => <RestaurantsCard
                                    address={rec.address}
                                    name={rec.restaurant.name}
                                    isOpened={this.getCurrentDate(rec.opening_hours, rec.closing_hours)}
                                    reviews={rec.reviews.length + " Reviews"}

                                />)}


                            </Grid>}
                            {latestReviews != null && latestReviews.length && <SectionHeaders text="Lastest reviews" value={latestReviews.length} />}
                            {latestReviews != null && latestReviews.length && <Grid container direction="row">
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


                                    {latestReviews.map(rec => <NewDishCard

                                        name={rec.product.name}
                                        des={rec.product.restaurant.name}
                                        review={rec.ratings}
                                        type="restaurant"
                                        url={API_IMAGE_URL + "/assets/images/dishes/" + rec.product.pimage.name + "/" + rec.product.pimage.path}
                                        classes={classes} />)}

                                </div>
                            </Grid>}
                            {<SectionHeaders text="Explore near you" />}
                            {dishes != null && <Grid item xs={12}>
                                <DishesList
                                    listItemOnClick={this.handleListItemClick}
                                    listData={dishes}
                                    listItemClass={classes.restaurantsListItem}
                                    changeOverlay={this.handleOverlay}
                                    // restaurantsName={restaurant ? restaurant.primary : id}
                                    // isLoggedIn={isLoggedIn}
                                    onReviewSubmit={this.handleReviewSubmit}
                                />

                            </Grid>}
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


                                    {topten && topten.map(rec => <NewDishCard

                                        name={rec.name}
                                        des={rec.restaurant_id[0].name}
                                        review={rec.avgRatings}
                                        url={API_IMAGE_URL + "/assets/images/dishes/" + rec.images[0].name + "/" + rec.images[0].path}
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
    topten: state.RestaurantsReducer.dishes && state.RestaurantsReducer.dishes.sort((a, b) => (a.avgRatings < b.avgRatings ? 1 : -1)),
    currentRestaurent: state.RestaurantsReducer.currentRestaurent,
    dishesWithTags: state.RestaurantsReducer.dishesWithTags,
    latestReviews: state.RestaurantsReducer.latestReviews,

}),
    {
        // toggleFilterMenu,
        // updateStoreWithQuery,
        setLatestReviews,
        setDishesWithTags
    })(withStyles(styles)(Home))