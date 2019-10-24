import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/common';
import { connect } from 'react-redux'
import { APP_URL, API_IMAGE_URL } from '../utils/config';
import RestaurantHeader from '../components/header/RestaurantHeader'
import RateCard from '../components/common/RateCard';
import WindowResizeListener from "react-window-size-listener";
import { Card, CardHeader, Avatar, IconButton, CardMedia, Grid, Typography } from '@material-ui/core';
import { StarRate, Add, Remove, CloseSharp } from '@material-ui/icons';
import {
	veganIcon,
	kosherIcon,
	glutenFreeIcon,
	fishIcon,
	vegetarianIcon,
	meatIcon,
	milkIcon,
	halalIcon
} from '../components/customIcon/customIcon';
import RestaurantLayout from '../components/layouts/RestaurantLayout';
import AdvanceReview from '../components/common/AdvanceReview';

const tagIcons = {
	vegan: veganIcon,
	kosher: kosherIcon,
	glutenfree: glutenFreeIcon,
	fish: fishIcon,
	vegetarian: vegetarianIcon,
	meat: meatIcon,
	milk: milkIcon,
	halal: halalIcon
};
class DishDetails extends Component {
	static async getInitialProps({ query: { id, name } }) {

		return { id, name }
	}
	state = {
		showModal: false,
		isDishDetails: true,
		top: 0,
		left: 0,

	}
	handleClose = () => {
		this.setState({
			showModal: false,
		})
	};
	getSelectedDish = () => {
		const { dishes } = this.props;
		const selectedDish = dishes.filter(rec => rec._id == this.props.id);
		return selectedDish;
	}
	getTag = (item) => {
		let TagIcon = tagIcons[item.name.replace(' ', '').toLowerCase()];
		return <TagIcon className={this.props.classes.TagIcon} />

	}
	handleSaveReview = () => {
		this.setState({
			showModal: true,
		})
	}
	handleOverlay = value => {
		this.setState({ overlay: !value });
	};

	handleToggleMenu = toggleMenu => {
		const { toggleFilterMenu } = this.props;
		toggleFilterMenu({ drawerOpen: toggleMenu });
	};
	componentDidMount = () => {

	}
	render() {
		const { showModal, isDishDetails } = this.state;
		const { classes, name } = this.props;
		const selectedDish = this.props.dishes != null && this.getSelectedDish();

		return <React.Fragment>
			<RestaurantLayout
				selectedPageTab={0}
				toggleMenu={this.handleToggleMenu}
				changeOverlay={this.handleOverlay}
				restaurantsName={name ? name : ""}
				isDishDetails={isDishDetails}
			>
				<WindowResizeListener
					onResize={windowSize => {
						this.setState({ winHeight: windowSize.windowHeight });
					}}
				/>
				{selectedDish.length > 0 && <Grid container
					direction="column"
				>
					<Grid item>
						<img
							style={{
								width: "100%",
								height: "296px",
								objectFit: "cover",
								backgroundSize: "cover"
							}}
							src={`${API_IMAGE_URL}/assets/images/dishes/${selectedDish[0].images[0].name}/${selectedDish[0].images[0].path}`} />
					</Grid>
					<Grid item>
						<Grid container direction="row">
							<Grid container direction="column" >
								<Grid item>
									<Typography
										style={{

											lineHeight: "32px",
											fontSize: "24px",
											fontFamily: "Bebas Neue",
											marginLeft: "17px"

										}}
									>
										{selectedDish[0].name}
									</Typography>
								</Grid>
								<Grid item>
									<Typography
										style={{
											fontSize: "15px",
											lineHeight: "20px",
											color: "#838383",
											fontFamily: "lato",
											fontStyle: "normal",
											fontWeight: "normal",
											display: "flex",
											left: "17px",
											marginLeft: "17px"
										}}
									><StarRate />
										<Typography style={{
											borderBottom: "1px solid grey",
											paddingTop: "5px"
										}}>
											{selectedDish[0].reviews.length} Reviews
							</Typography>
									</Typography>
								</Grid>

							</Grid>
							<Grid container direction="column" >
								<Grid>
									<span
										style={{
											position: "absolute",
											right: "110px",
											top: "390.34px",
										}}><Remove /></span>
									<Typography style={{
										position: "absolute",
										display: "inline",
										color: "#E53935",
										lineHeight: "20px",
										fontSize: "50px",
										right: "50px",
										top: "390px",
										width: "50px",
										height: "45px"


									}}>
										{selectedDish[0].avgRatings.toFixed(1)}
									</Typography>

									<span
										style={{
											position: "absolute",
											right: "5px",
											top: "390.34px",
										}}><Add /></span>
								</Grid>
								<Grid>
									{/* <RateCard
										handleClose={this.handleClose}
										open={showModal}
									/> */}
									<AdvanceReview
										handleClose={this.handleClose}
										open={showModal}
										top={this.state.top}
										left={this.state.left}
										selected={selectedDish[0]}
										getTags={this.getTag}
										dishImage={`${API_IMAGE_URL}/assets/images/dishes/${selectedDish[0].images[0].name}/${selectedDish[0].images[0].path}`}
									/>
								</Grid>
							</Grid>


						</Grid>
						<Grid>
							<Typography
								style={{
									fontSize: "14px",
									lineHeight: "24px",
									color: "#4A4A4A",
									fontFamily: "lato",
									fontStyle: "normal",
									fontWeight: "normal",
									padding: "5px",
									marginLeft: "17px",
									marginTop: "20px",
								}}
							>
								{selectedDish[0].description}
							</Typography>
						</Grid>
						<Grid container direction="row" >
							<Grid item xs={2}>
								<Typography
									style={{

										marginLeft: "17px",
										color: "#757575",
										marginTop: "10px",
										fontSize: "14px",
										fontWeight: "bold",

									}}
								>
									Calories:
						</Typography>
							</Grid>
							<Grid container item justify="center" xs={2}>
								<Typography
									style={{
										marginTop: "15px",
									}}
								>
									{" " + selectedDish[0].calories} KCal
							</Typography>
							</Grid>
						</Grid>

						<Grid container direction="row">
							<Grid item xs={2}>
								<Typography
									style={{
										height: "16px",
										marginLeft: "17px",
										marginTop: "10px",
										fontFamily: "Lato",
										fontStyle: "normal",
										fontWeight: "bold",
										fontSize: "14px",
										lineHeight: "24px",
										color: "#757575",
									}}
								>
									Tags:
						</Typography>
							</Grid>
							<Grid >
								<div
									style={{
										marginTop: "10px",
									}}
								>{selectedDish[0].tags.map((rec, index) => <span key={index} >{this.getTag(rec)}</span>)}
								</div>
							</Grid>
						</Grid>
						<Grid container direction="row">
							<Grid item xs={2}>
								<Typography
									style={{
										marginTop: "10px",
										height: "16px",
										marginLeft: "17px",
										fontFamily: "Lato",
										fontStyle: "normal",
										fontWeight: "bold",
										fontSize: "14px",
										lineHeight: "24px",
										color: "#757575",
									}}
								>
									Price :
						</Typography>
							</Grid>
							<Grid item>
								<Typography
									style={{
										color: "#E84E4E",
										fontFamily: "Lato",
										fontStyle: "normal",
										fontWeight: "800",
										fontSize: "14px",
										marginTop: "10px",
										lineHeight: "24px",
									}}
								>
									{selectedDish[0].price} $
								</Typography>
							</Grid>
						</Grid>
						<Grid >
							<div style={{
								background: "#F44336",
								marginTop: "20px",
								height: "56px",
								width: "100wv",
								padding: "20px 10% 0px 10%",
							}}>
								<Grid container direction="row">
									<Grid item xs={1}>
										<span
											style={{
												color: "white",
												display: "inline",
											}}
										><CloseSharp />
										</span>
									</Grid>
									<Grid item xs={3}>
										<span

											style={{
												color: "white",
												display: "inline",
											}}
										>
											Cancel
									</span>
									</Grid>
									<Grid item xs={2}>

									</Grid>
									<Grid item xs={1} >
										<span onClick={this.handleSaveReview} style={{
											color: "white"
										}}><Add /> </span>
									</Grid>
									<Grid item xs={4} >
										<span style={{
											color: "white"
										}}>
											Save a Review
								</span>
									</Grid>
								</Grid>
							</div>
						</Grid>
					</Grid>

				</Grid>

				}
			</RestaurantLayout>
		</React.Fragment>

	}
}

export default connect(
	state => ({
		global: state.global,
		restaurants: state.RestaurantsReducer.restaurants,
		dishes: state.RestaurantsReducer.dishes,
	}),
	{
		// toggleFilterMenu,
		// updateStoreWithQuery,
		// selectFilterTab,
		// showHideMenu
	}
)(withStyles(styles)(DishDetails))
