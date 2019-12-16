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
import { restaurantAPI } from '../services/restaurantAPI';
import ReviewCard from '../components/review/ReviewCard';
import MenusDropdown from '../components/menu/MenusDropDown';
import * as _ from 'lodash'
import { css } from 'emotion';

class RestaurantDetails extends Component {
	state = {
		isDishDetails: true,
		data: [],
		timeData: [],
		menus: [],
		isOpen: false
	}
	handleOverlay = value => {
		this.setState({ overlay: !value });
	};
	handleToggleMenu = toggleMenu => {
		const { toggleFilterMenu } = this.props;
		toggleFilterMenu({ drawerOpen: toggleMenu });
	};
	getTimingAndValues = (days, open_hours) => {
		let list = days.map(rec => {
			return { "day": rec.substring(0, 3), "time": open_hours[rec] }
		})
		var result = _(list)
			.groupBy(x => x.time)
			.map((value, key) => ({
				time: key,
				days: value,
			}))
			.value();
		this.setState({
			timeData: result
		})


	}

	handleMenuClick = () => {
		console.log('here');
		this.setState({ isOpen: !isOpen });
	}



	componentDidMount = async () => {
		reviewAPI.getLatestReview().then(res => this.setState({
			data: res
		}))
		this.getTimingAndValues(this.props.currentRestaurent[0].open_days, this.props.currentRestaurent[0].opening_hours);
		let list = this.props.currentRestaurent[0].open_days.map((rec) => this.props.currentRestaurent[0].opening_hours[rec]);
		// var result = _(list)
		//     .groupBy(x => x)
		//     .map((value, key) => ({
		//         time: value,
		//         index: key,
		//     }))
		//     .value();
		// console.log("result opening hour===>", result);
		const { currentRestaurent } = this.props;
		this.state.menus = await restaurantAPI.getMenus(currentRestaurent[0].restaurant_id);
		console.log('these are', this.state.menus);

	}

	getDesh = (length, index) => {
		if (parseInt(length) - parseInt(index) > 1) {
			console.log(length)
			console.log(index)
			return "-"
		}
		return ""
	}

	render() {
		const { currentRestaurent } = this.props;
		let restForMenu = null;
		if(currentRestaurent != null) {
			restForMenu = currentRestaurent[0].restaurant;
		}
		let avatar = '/static/imgs/image-not-found-dark.png';
		// const { name, images } = currentRestaurent && currentRestaurent[0].restaurant[0];
		console.log("curent restaurents", currentRestaurent);
		const { isDishDetails, timeData, menus, isOpen } = this.state;
		console.log('in render menus are', menus);
		console.log("open data ==>", timeData);
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
											{currentRestaurent[0].webUrl || "http://www.dishin.com"}
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

										{timeData.length > 0 && <div className={
											css`
                                                display: inline;
                                                vertical-align:top;
                                                margin-left:10px
                                            `
										}>
											{
												timeData.map(rec1 => {
													return <React.Fragment><div className={
														css`
                                                            display:inline-block
        
                                                      `
													}>
														{rec1.days.map((record, index) => <span>{record.day + "" + this.getDesh(rec1.days.length, index)} </span>)}
														<span>:{rec1.time}</span>
													</div><span className={css`
                                                        height:10px;
                                                        background:grey;

                                                    `}></span> </React.Fragment>
												})
											}

										</div>}


									</div>

								</Grid>
								<Divider />
							</Grid>
						</div>
					</Grid>



				</Grid>



				}

				<Grid >
					<MenusDropdown menus={menus} restaurant={restForMenu} />
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