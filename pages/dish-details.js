import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/common';
import { connect } from 'react-redux'
import { APP_URL, API_IMAGE_URL } from '../utils/config';
import RestaurantHeader from '../components/header/RestaurantHeader'
import { Card, CardHeader, Avatar, IconButton, CardMedia, Grid, Typography } from '@material-ui/core';
import { StarRate, Add, Remove } from '@material-ui/icons';
class DishDetails extends Component {
	static async getInitialProps({ query: { id } }) {
		console.log("id===>", id)
		return { id }
	}
	getSelectedDish = () => {
		const { dishes } = this.props;
		const selectedDish = dishes.filter(rec => rec._id == this.props.id);
		return selectedDish;
	}

	render() {
		const { classes } = this.props;
		const selectedDish = this.props.dishes != null && this.getSelectedDish();
		console.log("selected dish===>", selectedDish);
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
										left: "17px",
										lineHeight: "32px",
										fontSize: "24px",
										fontFamily: "Bebas Neue",

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
						<Grid item >

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
								left: "17px",
							}}
						>
							Worlds best fudgiest brownies is my best brownie recipe!
							perfect crisp crackly top, super fudgy centre,
							chewy or gooey in all the right places,
							studded with melted chunks of chocolate!
			</Typography>
					</Grid>
					<Grid>
						<Typography
							style={{
								position: "absolute",
								left: "10px",
								color: "#757575",
								// top: "503px",
								fontSize: "14px",
								fontWeight: "bold",
							}}
						>
							Calories:{selectedDish[0].calories} KCal
						</Typography>
					</Grid>
				</Grid>

			</Grid>}
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
