import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/common';
import { connect } from 'react-redux'
import { APP_URL, API_IMAGE_URL } from '../utils/config';
import RestaurantHeader from '../components/header/RestaurantHeader'
import RateCard from '../components/common/RateCard';
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
	static async getInitialProps({ query: { id } }) {
		console.log("id===>", id)
		return { id }
	}
	state = {
		showModal: false,

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
		console.log("Tag Icon==>", TagIcon);

		return <TagIcon />

	}
	handleSaveReview = () => {
		this.setState({
			showModal: true,
		})
	}
	render() {
		const { showModal } = this.state;
		const { classes } = this.props;
		const selectedDish = this.props.dishes != null && this.getSelectedDish();

		selectedDish && console.log(API_IMAGE_URL + "/assets/images/dishes/" + selectedDish[0].images[0].name + "/" + selectedDish[0].images[0].path)
		return <React.Fragment>

			<RestaurantHeader isDishDetails="true" />
			{selectedDish && <Grid container
				direction="column"
			>
				<Grid item>
					<img
						style={{
							width: "100%",
							height: "296px"
						}}
						src={`${API_IMAGE_URL}/assets/images/dishes/${selectedDish[0].images[0].name}/${selectedDish[0].images[0].path}`} />
				</Grid>
				<Grid item>
					<Grid container direction="row">
						<Grid conatiner direction="column" >
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
										top: "320.34px",
									}}><Remove /></span>
								<Typography style={{
									position: "absolute",
									display: "inline",
									color: "#E53935",
									lineHeight: "20px",
									fontSize: "50px",
									right: "50px",
									top: "316px",
									width: "50px",
									height: "45px"


								}}>
									4.5
									</Typography>

								<span
									style={{
										position: "absolute",
										right: "5px",
										top: "320.34px",
									}}><Add /></span>
							</Grid>
							<Grid>
								<RateCard
									handleClose={this.handleClose}

									open={this.state.showModal}
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
							Worlds best fudgiest brownies is my best brownie recipe!
							perfect crisp crackly top, super fudgy centre,
							chewy or gooey in all the right places,
							studded with melted chunks of chocolate!
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
						<Grid container justify="center" xs={2}>
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
						<Grid xs={2}>
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
						<Grid spacing={1}>
							<Typography
								style={{
									marginTop: "10px",
								}}
							>{selectedDish[0].tags.map(rec => <span >{this.getTag(rec)}</span>)}
							</Typography>
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
								{selectedDish[0].price}
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
								<Grid xs={1}>
									<span
										style={{
											color: "white",
											display: "inline",
										}}
									><CloseSharp />
									</span>
								</Grid>
								<Grid xs={3}>
									<span

										style={{
											color: "white",
											display: "inline",
										}}
									>
										Cancel
									</span>
								</Grid>
								<Grid xs={2}>

								</Grid>
								<Grid xs={1} >
									<span onClick={this.handleSaveReview} style={{
										color: "white"
									}}><Add /> </span>
								</Grid>
								<Grid xs={4} >
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
