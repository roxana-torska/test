import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Grid, Tabs, Tab, Typography } from '@material-ui/core';
import CustomInputSearch from '../customInputSearch/customInputSearch';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import DrawerFilterMenu from '../menu/DrawerFilterMenu';
import styles from '../../styles/common';
import UserDrawer from '../menu/UserDrawer';
import actions from '../../redux/global/actions';
import { connect } from 'react-redux';
import { APP_URL } from '../../utils/config';
import { stringify } from 'qs';
import { rewardAPI } from '../../services/rewardAPI';
import Badge from '@material-ui/core/Badge';
import UserMenu from '../menu/UserMenu';
import { getQueryParams, getDishInHistory } from '../../utils/common';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowBack from '@material-ui/icons/ArrowBack';
import slug from 'slug';
import SearchIcon from '@material-ui/icons/Search';
import classnames from 'classnames';
import WindowResizeListener from 'react-window-size-listener';
import ClearIcon from '@material-ui/icons/Clear';

const { setSearchValue, updateUserRewards, hideFilterFabIcon } = actions;

class MenuHeader extends Component {
	state = {
		userDrawer: false,
		overlay: false,
		userMenu: false,
		anchorEl: null,
		selectedMenu: '',
		selectedMenuCategory: '',
		menuCategories: [],
		hideRegularBar: false,
		winWidth: '100vw'
	};

	componentDidMount() {
		const {
			global: { isLoggedIn, user, token, searchText },
			menuData,
			updateUserRewards
		} = this.props;
		// select first menu
		menuData && menuData.length && this.selectMenu(menuData[0].name);
		if (searchText) {
			this.setState({ hideRegularBar: true });
		}
		if (isLoggedIn) {
			rewardAPI.getRewards({ token }).then(response => {
				if (response.length) {
					updateUserRewards(response);
				}
			});

		}
	}

	handleDrawerOpen = () => {
		const { toggleMenu } = this.props;
		this.setState({ overlay: true });
		toggleMenu && toggleMenu(true);
	};

	handleDrawerClose = () => {
		const { toggleMenu, changeOverlay } = this.props;
		this.setState({ overlay: false });
		changeOverlay(true);
		toggleMenu && toggleMenu(false);
	};
	handleUserMenuOpen = event => {
		const {
			global: { isLoggedIn }
		} = this.props;
		if (!isLoggedIn) {
			window.location.href = `/sign-in?redirect=${escape(
				window.location.href
			)}`;
			return;
		}
		this.setState({
			userMenu: true,
			anchorEl: event.currentTarget
		});
	};

	handleUserDrawerClose = () => {
		this.setState({
			userDrawer: false,
			overlay: false
		});
	};

	handleTabChange = (evt, tab) => {
		evt.preventDefault();
		switch (tab) {
			case 2:
				window.location.href = '/rewards';
				break;
			case 1:
				window.location.href = '/my-reviews';
				break;
			default:
				window.location.href = '/restaurants';
				break;
		}
	};

	handleOnSearch = searchText => {
		const {
			global: { filters, searchBy, sort, direction }
		} = this.props;

		let response = getQueryParams({
			filters,
			searchBy,
			sort,
			direction,
			searchText
		});
		window.location.href = `/restaurants?${stringify(response, {
			encodeValuesOnly: true
		})}`;
	};

	handleUserMenuClose = () => {
		this.setState({ userMenu: false });
	};

	handleUserProfile = () => {
		this.setState({ userMenu: false, userDrawer: true, overlay: true });
	};
	selectMenu = selected => {
		const { menuData, } = this.props;
		let menu = menuData.find(item => item.name === selected);
		let menuCategories = [];
		let selectedMenuCategory = '';
		if (menu) {
			menuCategories = [...menu.category];
			selectedMenuCategory = menuCategories[0].name;
		}
		this.setState({
			selectedMenu: selected,
			menuCategories,
			selectedMenuCategory
		});
		// onMenuChange(selected, selectedMenuCategory);
	};
	handleMenuChange = evt => {
		let selectedMenu = evt.target.value;
		this.selectMenu(selectedMenu);
	};
	handleMenuCategoryChange = evt => {
		const { onMenuChange } = this.props;
		const { selectedMenu } = this.state;
		const selectedMenuCategory = evt.target.value;
		this.setState({ selectedMenuCategory });
		// onMenuChange(selectedMenu, selectedMenuCategory);
	};

	goToBack = () => {
		let backUrl = '';

		if (localStorage.getItem('dishInHistory')) {
			let dishInHistory = JSON.parse(localStorage.getItem('dishInHistory'));

			let currentUrl = window.location.href;
			//localStorage.setItem('backUrl', currentUrl);
			if (dishInHistory.length > 0) {
				let backUrlIndex = dishInHistory.findIndex(el => {
					return el === currentUrl;
				});

				if (backUrlIndex >= 0) {
					backUrl = dishInHistory[backUrlIndex - 1];
					dishInHistory.splice(backUrlIndex);
					localStorage.setItem('dishInHistory', JSON.stringify(dishInHistory));
				} else {
					backUrl = dishInHistory[dishInHistory.length - 1];
				}
			} else {
				backUrl = dishInHistory[0];
			}
		}
		if (backUrl) {
			window.location.href = backUrl;
		} else {
			window.location.href = document.referrer;
		}
	};

	handleShowSearchBar = () => {
		console.log('ref', this.inputSearch);
		const { hideRegularBar } = this.state;
		if (hideRegularBar && this.inputSearch && this.inputSearch.state) {
			if (this.inputSearch.state.fieldValue) {
				this.handleOnSearch(this.inputSearch.state.fieldValue);
			}
		} else {
			this.setState({ hideRegularBar: true });
		}
	};

	handleCloseSearchBar = () => {
		this.setState({ hideRegularBar: false });
	};

	handleCustomInputSearchFocus = value => {
		const { hideFilterFabIcon } = this.props;
		hideFilterFabIcon(value);
	};

	handleOnClear = () => {
		const {
			global: { searchText }
		} = this.props;
		if (searchText) {
			window.location.href = `${APP_URL}/restaurants`;
		} else {
			this.setState({ hideRegularBar: false });
		}
	};
	showMenuName = () => {
		const { menuName } = this.props;
		if (menuName) {
			return <Typography style={{ color: "white", fontSize: "20px", fontFamily: "bebasneue" }}>{menuName}</Typography>
		}
		return <img
			src='/static/imgs/logo.png'
			style={{ width: '23px', height: '15px' }}
		/>
	}
	searchComponent = (hideRegularBar) => {
		const { classes,
			global: { searchText },
		} = this.props;
		if (!hideRegularBar) {
			return (
				<div className={classes.topBarLogoContainer}>
					{this.showMenuName()}
				</div>
			)
		}

		return <CustomInputSearch
			id='searchRestaurant'
			innerRef={ref => {
				this.inputSearch = ref;
			}
			}
			label=''
			placeholder='Search Restaurants and Dishes'
			fullWidth
			onSearch={this.handleOnSearch}
			defaultValue={searchText || ''}
			onClose={this.handleCloseSearchBar}
			onFocus={this.handleCustomInputSearchFocus}
			onClear={this.handleOnClear}
		/>

	}
	getHeaderTabs = () => {
		const { isDishDetails, classes, menuData, selectedPageTab, isHomePage } = this.props;
		const { selectedMenu, selectedMenuCategory, menuCategories } = this.state;
		let rewardCount = null
		if (!isDishDetails && !isHomePage) {
			return (
				menuData && menuData.length ? (
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='center'
						spacing={0}
						wrap='nowrap'
						className={classes.restaurantMenu}
						style={{
							paddingLeft: '16px',
							paddingRight: '16px'
						}}
					>
						<Grid item xs={1} />
						{/* <Grid item xs={5}>
							<FormControl className={classes.restaurantMenuItem}>
								<Select
									value={selectedMenu || menuData[0].name}
									onChange={this.handleMenuChange}
									disableUnderline
									classes={{
										root: classnames(
											classes.restaurantMenuSelect,
											classes.marginNormal
										),
										selectMenu: classes.restaurantMenuSelected,
										icon: classes.restaurantMenuLabel
									}}
								>
									{menuData.map(menu =>
										menu ? (
											<MenuItem key={`${menu._id}_menu`} value={menu.name}>
												{menu.name}
											</MenuItem>
										) : null
									)}
								</Select>
							</FormControl>
						</Grid> */}

						<Grid item xs={5} style={{ textAlign: 'right' }}>
							<FormControl className={classes.restaurantMenuItem}>
								<Select
									value={
										selectedMenuCategory ||
										(menuCategories.length ? menuCategories[0].name : '')
									}
									onChange={this.handleMenuCategoryChange}
									disableUnderline
									classes={{
										root: classnames(
											classes.restaurantMenuSelect,
											classes.marginNormal
										),
										selectMenu: classes.restaurantMenuSelected,
										icon: classes.restaurantMenuLabel
									}}
								>
									{menuCategories.map(menuCat =>
										menuCat ? (
											<MenuItem
												key={`${menuCat._id}_menu_cat`}
												value={menuCat.name}
											>
												{menuCat.name}
											</MenuItem>
										) : null
									)}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={1} />
					</Grid>
				) : (
					<div></div>
						// <Tabs
						// 	indicatorColor='primary'
						// 	textColor='primary'
						// 	variant='fullWidth'
						// 	value={selectedPageTab}
						// 	onChange={this.handleTabChange}
						// 	classes={{ root: classes.topSearchTabsRoot }}
						// >
						// 	<Tab
						// 		label='Results'
						// 		classes={{ root: classes.topSearchTabRoot }}
						// 	/>
						// 	<Tab
						// 		label='Reviews'
						// 		classes={{ root: classes.topSearchTabRoot }}
						// 	/>
						// 	<Tab
						// 		label={
						// 			<div>
						// 				<Badge
						// 					color='primary'
						// 					badgeContent={rewardCount}
						// 					classes={{ badge: classes.rewardCount }}
						// 				>
						// 					Rewards
						// 	  </Badge>
						// 			</div>
						// 		}
						// 		classes={{ root: classes.topSearchTabRoot }}
						// 	/>
						// </Tabs>
					)
			)
		}
	}
	handleArrowIcon = (menuData) => {
		const { isDishDetails, classes } = this.props;
		console.log(
			'menuData', menuData
		)
		if (!isDishDetails) {
			if (menuData) {
				return menuData.length ? (
					<IconButton
						color='inherit'
						aria-label='User Drawer'
						onClick={this.goToBack}
					>
						<ArrowBack
							color='primary'
							className={classes.userDrawerCloseButton}
						/>
					</IconButton>
				) : (
						<SearchIcon
							color='primary'
							onClick={this.handleShowSearchBar}
							className={classes.userDrawerCloseButton}
							style={{ width: '18px', height: '18px' }}
						/>
					)
			}
			return <SearchIcon
				color='primary'
				onClick={this.handleShowSearchBar}
				className={classes.userDrawerCloseButton}
				style={{ width: '18px', height: '18px' }}
			/>

		}
		return <IconButton
			color='inherit'
			aria-label='User Drawer'
			onClick={this.goToBack}
		><ArrowBack
				color='primary'
				className={classes.userDrawerCloseButton}
			/></IconButton>
	}
	render() {
		const {
			classes,
			selectedPageTab,
			global: { searchText, userRewards, hideMainMenu, isLoggedIn },
			menuData
		} = this.props;

		const {
			userDrawer,
			overlay,
			userMenu,
			anchorEl,
			selectedMenu,
			selectedMenuCategory,
			menuCategories,
			hideRegularBar,
			winWidth
		} = this.state;
		let rewardCount = null;
		const tempUserRewards = [];
		if (userRewards.length) {
			userRewards.map(rec => {
				if (!rec.isRedeemed) {
					tempUserRewards.push(rec);
				}
			});
			rewardCount = tempUserRewards.length;
		}
		let searchButtonPadding = winWidth * (3 / 100);

		return (
			<div className={classes.root}>
				{overlay ? <div className={classes.overlay} /> : null}
				<AppBar color='primary'>
					<WindowResizeListener
						onResize={windowSize => {
							this.setState({ winWidth: windowSize.windowWidth });
						}}
					/>
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='center'
						spacing={0}
						style={{ height: '56px' }}
					>
						<div style={{ height: '25%', width: '100%' }} />
						<Grid
							container
							direction='row'
							justify='center'
							alignItems='center'
							spacing={0}
							style={{ height: '50%', display: 'flex', flexWrap: 'nowrap' }}
						>
							<div style={{ width: '3%' }} />
							<div style={{ width: '97%' }}>
								<Grid
									container
									direction='row'
									justify='center'
									alignItems='center'
									spacing={0}
								>
									<Grid
										item
										xs={1}
									>
										{this.handleArrowIcon(menuData)}
									</Grid>
									<Grid
										item
										xs={9}
										style={{
											textAlign: 'left',
											paddingRight: '16px',
											paddingLeft: '16px'
										}}
									>
										{this.searchComponent(hideRegularBar)}
									</Grid>
									<Grid item xs={1} style={{ textAlign: 'left' }}>
										{!this.props.isHomePage && <SearchIcon
											color='primary'
											onClick={this.handleShowSearchBar}
											className={classes.userDrawerCloseButton}
											style={{ width: '18px', height: '18px' }}
										/>
										}

									</Grid>
									<Grid
										item
										xs={1}
										className={classes.drawerIcon}
										style={{ textAlign: 'right', padding: '8px' }}
									>
										{!hideRegularBar ? (
											<MoreVert
												className={classes.drawerMenuIcon}
												onClick={this.handleUserMenuOpen}
												style={{ width: '14px', height: '14px' }}
											/>
										) : (
												<ClearIcon
													className={classes.iconWhite}
													onClick={this.handleOnClear}
													style={{ width: '14px', height: '14px' }}
												/>
											)}
									</Grid>
								</Grid>
							</div>
						</Grid>
						<div style={{ height: '25%', width: '100%' }} />
					</Grid>
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='center'
						spacing={0}
					>
						<DrawerFilterMenu drawerClose={this.handleDrawerClose} />
					</Grid>
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='center'
						spacing={0}
					>
						<UserDrawer
							openDrawer={userDrawer}
							closeDrawer={this.handleUserDrawerClose}
						/>
					</Grid>
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='center'
						spacing={0}
					>
						<UserMenu
							open={userMenu}
							anchorEl={anchorEl}
							userProfile={this.handleUserProfile}
							userMenuClose={this.handleUserMenuClose}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						className={classnames(
							classes.mainNavbar,
							!hideMainMenu ? classes.hideMainNavbar : {}
						)}
					>

					</Grid>
					{this.getHeaderTabs()}
				</AppBar>
			</div>
		);
	}
}

MenuHeader.propTypes = {
	classes: PropTypes.object.isRequired
};

export default connect(
	state => ({
		global: state.global
	}),
	{
		setSearchValue,
		updateUserRewards,
		hideFilterFabIcon
	}
)(withStyles(styles)(MenuHeader));
