import React, { PureComponent, Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styles from '../../styles/common';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { APP_URL, API_IMAGE_URL } from '../../utils/config';
import actions from '../../redux/global/actions';
import DishCard from '../common/DishCard';
import { reviewAPI } from '../../services/reviewAPI';
import { restaurantAPI } from '../../services/restaurantAPI';
import restaurantsAction from '../../redux/restaurants/actions'
const { setDishes } = restaurantsAction;
const { updateUserReview } = actions;
class DishesList extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	componentDidUpdate() {
		this.scrollToMyRef();
	}
	
	state = {
		anchorEl: null,
		reviewOpen: false,
		commonRating: null,
		currentItem: {},
	};

	handleReviewClose = evt => {
		evt.stopPropagation();
		const { changeOverlay } = this.props;
		this.setState({
			anchorEl: null,
			reviewOpen: false,
			commonRating: null,
			currentItem: {}
		});
		changeOverlay(true);
	};

	handleReviewSubmit = async (type, ratings, dishId) => {
		let payload = {
			data: {
				ratings,
				dishId,
				type,
				createdAt: new Date(),
			},
			token: this.props.global.token,
		}

		let resrult = await reviewAPI.addAndUpdateReview(payload)
		if (
			resrult
		) {
			restaurantAPI.getDishes({ token: this.props.global.token }).then((res) => {
				// let resp = Object.values(res.JSON());
				console.log(res.data);
				// alert(res.data);
				this.props.setDishes({
					data: res.data
				})
			})
			reviewAPI.getReviews({ token: this.props.global.token }).then(response => {
				const query = {
					myreviews: response,
				};
				console.log("latest ", response);
				this.props.updateUserReview(response);
			});

		}
	};

	getItemLists = (el, listItemOnClick, key) => {
		console.log("element===>", el);
		const { classes, selectedIndex, restaurantsName } = this.props;


		return (
			<ListItem
				key={`rest_${key}`}
				button
				component='div'
				href='#'
				selected={selectedIndex === key}
				alignItems='flex-start'
				className={classes.listItem}
			// onClick={evt => listItemOnClick(evt, key, el)}
			>
				<DishCard
					data={el}
					onSubmit={this.handleReviewSubmit}
					onCancel={this.handleReviewClose}
					restaurantsName={restaurantsName}
				/>
			</ListItem>
		);
	};

	componentDidMount() {
		// this.scrollToMyRef();
	}

	groupBy = key => array =>
		array.reduce((objectsByKeyValue, obj) => {
			const value = obj[key];
			value.map(val => objectsByKeyValue[val['name']] = (objectsByKeyValue[val['name']] || []).concat(obj));
			return objectsByKeyValue;
		}, {});

	scrollToMyRef = () => { if(this.myRef.current != null) window.scrollTo(0, this.myRef.current.offsetTop) }

	render() {
		const { 
			
			listData, listItemOnClick, classes, global: { selectedCategory }, menuData } = this.props;
		console.log("liest data===>", listData);
		console.log('selectedCategory', selectedCategory);
		const groupByCategory = this.groupBy('menuCategories');
		const groupedData = groupByCategory(listData);
		console.log('menuData in list', menuData)
		console.log('groupedData', groupedData)
		// const filteredList = listData.filter(dish => dish.menuCategories.find(category => category.name == selectedCategory));
		return Object.keys(groupedData).length && menuData != null ? (
			<List className={classes.listRoot}>
				{menuData[0]['category'].map(category => {
					const categoryName = category.name;
					console.log('conditioning', categoryName in groupedData)
					if (categoryName in groupedData) {
						return (
							<div>
								<span ref={categoryName === selectedCategory ? this.myRef : null} className={classes.subCategoryName}>{categoryName}</span>
								{groupedData[categoryName].map((dish, index) => {
									console.log("dishesNiv=====>", dish);
									let dishAvatar = '';
									if (dish.images.length) {
										dishAvatar = `${API_IMAGE_URL}/assets/images/dishes/${dish.slug}/${
											dish.images[0].path
											}`;
									}
									const item = {
										avatar: dishAvatar,
										primary: dish.name,
										slug: dish.slug,
										images: dish.images,
										secondary: dish.desc,
										price: dish.price,
										id: dish._id,
										avgRatings: dish.avgRatings || 0,
										avgValueForMoneyRatings: dish.avgValueForMoneyRatings,
										avgTasteRatings: dish.avgTasteRatings,
										avgLookAndFeelRatings: dish.avgLookAndFeelRatings,
										providerName: dish.restaurant_id ? dish.restaurant_id[0].name : '',
										reviews: dish.reviews ? dish.reviews[0] : [],
										tags: dish.tags || [],
										type: 'dish'
									};
									return this.getItemLists(item, listItemOnClick, index);
								})}
							</div>
						)
					}
				})
				}
			</List>
		) : (
				<List className={classes.listRoot}>
					<ListItem>
						<div>Not found!</div>
					</ListItem>
				</List>
			);
	}
}

export default connect(
	state => ({
		global: state.global
	}),
	{
		updateUserReview,
		setDishes,
	}
)(withStyles(styles)(DishesList));
