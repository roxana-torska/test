import React, { Component } from 'react'
import { connect } from 'react-redux'
import WindowResizeListener from "react-window-size-listener";
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/common';
import RestaurantLayout from '../components/layouts/RestaurantLayout';
class RestaurantDetails extends Component {
    state = {
        isDishDetails: true
    }
    handleOverlay = value => {
        this.setState({ overlay: !value });
    };
    handleToggleMenu = toggleMenu => {
        const { toggleFilterMenu } = this.props;
        toggleFilterMenu({ drawerOpen: toggleMenu });
    };
    render() {
        const name = "Restaurants"
        const { currentRestaurent } = this.props;

        console.log("curent restaurents", currentRestaurent && currentRestaurent[0]);
        const { isDishDetails } = this.state;
        return <React.Fragment>
            <RestaurantLayout
                selectedPageTab={0}
                toggleMenu={this.handleToggleMenu}
                changeOverlay={this.handleOverlay}
                restaurantsName={currentRestauren ? currentRestaurent[0].restaurant[0].name : ""}
                isDishDetails={isDishDetails}
            >
                <WindowResizeListener
                    onResize={windowSize => {
                        this.setState({ winHeight: windowSize.windowHeight });
                    }}
                />


            </RestaurantLayout>
        </React.Fragment>


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