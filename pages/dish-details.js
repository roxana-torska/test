import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/common';
import { connect } from 'react-redux'
import { APP_URL, API_IMAGE_URL } from '../utils/config';
import WindowResizeListener from "react-window-size-listener";
import { Grid, Typography } from '@material-ui/core';
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
import { reviewAPI } from '../services/reviewAPI';
import ReviewCard from '../components/review/ReviewCard';

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
		likeTags: [],
		dislikeTags: [],
		showLikeInput: false,
		likeItem: "",
		disLikeItem: "",
		showDisLikeInput: false,
		showAdvance: false,
		valueForMoney: 0,
		lookAndFeel: 0,
		taste: 0,
		data: []

	}

	componentDidMount = () => {
		reviewAPI.getLatestReview().then(res => this.setState({
			data: res
		}))
	}
	//increment of review data
	handleIncreament = (name, value) => {
		if (value < 10) {
			return this.setState({
				[name]: parseFloat(value) + 1,
			})
		}

	}
	//submit detailed review 
	handleReviewSubmit = async () => {
		const {
			likeTags,
			dislikeTags,
			valueForMoney,
			lookAndFeel,
			taste,
		} = this.state;
		let payload = {
			data: {
				valueForMoneyRatings: valueForMoney,
				lookAndFeelRatings: lookAndFeel,
				tasteRatings: taste,
				likes: likeTags,
				dislikes: dislikeTags,
				dishId: this.props.id,
				typeId: this.props.id,
				typeObject: "Dish",

				createdAt: new Date(),

			},
			token: this.props.global.token,
		}
		console.log("payload data=====>", payload);
		let result = await reviewAPI.addAndUpdateReview(payload);
		console.log("result====>", result);
		if (result) {
			window.location.href = "/social-medialist"
		}
	};
	// decreament of review data
	handleDecreament = (name, value) => {
		if (value > 0) {
			return this.setState({
				[name]: value - 1,
			})
		}

	}

	//show advance review screen 
	showAdvance = () => {
		this.setState({
			showAdvance: true
		})
	}
	//hide advance review screen 
	hideAdvance = () => {
		this.setState({
			showAdvance: false,
		})
	}
	//add Like item
	addLikeItem = () => {
		let { likeTags, likeItem } = this.state;
		this.setState({
			likeTags: [...likeTags, likeItem],
			likeItem: "",
		})
	}
	//add dislike item 
	addDisLikeItem = () => {
		let { dislikeTags, disLikeItem } = this.state;
		this.setState({
			dislikeTags: [...dislikeTags, disLikeItem],
			disLikeItem: ""
		})
	}
	//handle like tag delete 
	handleLikeDelete = (i) => {
		console.log("index", i);
		const { likeTags } = this.state;
		const tags = likeTags.splice(i, 1);
		console.log("tags", tags);
		this.setState({
			likeTags,
		})
	}
	//handle dislike tag delete
	handleDisLikeDelete = (i) => {
		const { dislikeTags } = this.state;
		const tags = dislikeTags.splice(i, 1);
		console.log("tags", dislikeTags);
		this.setState({
			dislikeTags,
		})
	}
	//closeLikeIput
	closeLikeInput = () => {
		this.setState({
			showLikeInput: false
		})
	}
	//close Dislike input
	closeDisLikeInput = () => {
		this.setState({
			showDisLikeInput: false
		})
	}
	//handle like input change
	handleLikeChange = (evt) => {
		this.setState({
			likeItem: evt.target.value,
		})

	}
	handleDisLikeChange = (evt) => {
		this.setState({
			disLikeItem: evt.target.value,
		})

	}

	// handleLikeAdd = ()=>{
	//     this.setState({
	//         likeTags:[...this.state,
	//         ]
	//     })
	// }
	showLikeInputField = () => {
		this.setState({
			showLikeInput: true,
		})
	}
	showDisLikeInputField = () => {
		this.setState({
			showDisLikeInput: true,
		})
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

	render() {
		const { showModal,
			isDishDetails,
			likeTags,
			dislikeTags,
			showLikeInput,
			likeItem,
			disLikeItem,
			showDisLikeInput,
			showAdvance,
			valueForMoney,
			lookAndFeel,
			taste,


		} = this.state;
		let reviewData = [
			{ data: "Value For money", rate: `${valueForMoney}`, name: "valueForMoney" },
			{ data: "Look and feel", rate: `${lookAndFeel}`, name: "lookAndFeel" },
			{ data: "Taste", rate: `${taste}`, name: "taste" },
		]
		const { classes, name } = this.props;
		const selectedDish = this.props.dishes != null && this.getSelectedDish();
		console.log("selected dish ====>", selectedDish);



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
										{selectedDish[0].name || "no name"}
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
								<Grid onClick={this.handleSaveReview}>
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
										right: "35px",
										top: "390px",
										width: "50px",
										height: "45px"

									}}>
										{selectedDish[0].avgRatings != null && selectedDish[0].avgRatings.toFixed(0)}
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
										selected={selectedDish[0]}
										getTags={this.getTag}
										showDisLikeInputField={this.showDisLikeInputField}
										showLikeInputField={this.showLikeInputField}
										handleDisLikeChange={this.handleDisLikeChange}
										handleLikeChange={this.handleLikeChange}
										closeDisLikeInput={this.closeDisLikeInput}
										closeLikeInput={this.closeLikeInput}
										handleDisLikeDelete={this.handleDisLikeDelete}
										handleLikeDelete={this.handleLikeDelete}
										addDisLikeItem={this.addDisLikeItem}
										addLikeItem={this.addLikeItem}
										hideAdvance={this.hideAdvance}
										showAdvance={this.showAdvance}
										handleIncreament={this.handleIncreament}
										handleDecreament={this.handleDecreament}

										likeTags={likeTags}
										dislikeTags={dislikeTags}
										showLikeInput={showLikeInput}
										likeItem={likeItem}
										disLikeItem={disLikeItem}
										showDisLikeInput={showDisLikeInput}
										showAdvanceVar={showAdvance}
										reviewData={reviewData}
										handleReviewSubmit={this.handleReviewSubmit}

										dishImage={`${API_IMAGE_URL}/assets/images/dishes/${selectedDish[0].images[0].name}/${selectedDish[0].images[0].path}`}
										classes={classes}
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
							{/* <div style={{
								background: "#F44336",
								marginTop: "20px",
								height: "56px",
								width: "100wv",
								padding: "20px 10% 0px 10%",
							}}> */}
							{/* <Grid container direction="row"> */}

							{/* <Grid item xs={4}>
										<span
											style={{
												color: "white",
												display: "inline",
												verticalAlign: "top"
											}}
										><CloseSharp />
										</span>
										<span

											style={{
												color: "white",
												display: "inline",
											}}
										>
											Cancel
									</span>
									</Grid> */}
							{/* <Grid item xs={2} sm={2} md={4} lg={4}>

									</Grid> */}

							{/* <Grid item xs={6} md={4} lg={2} sm={6}>
										<span onClick={this.handleSaveReview} style={{
											color: "white",
											verticalAlign: "top"
										}}><Add /> </span>
										<span style={{
											color: "white",
											verticalAlign: "top"
										}}>
											Save a Review
								</span>
									</Grid> */}
							{/* </Grid>
							</div> */}
						</Grid>
					</Grid>
					<Grid>
						{this.state.data.length > 0 && <ReviewCard data={this.state.data} />}

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
