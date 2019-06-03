const globalActions = {
  TOGGLE_FILTER_MENU: 'TOGGLE_FILTER_MENU',
  TOGGLE_FILTER_ACCORDION: 'TOGGLE_FILTER_ACCORDION',
  UPDATE_STORE_WITH_QUERY: 'UPDATE_STORE_WITH_QUERY',
  UPDATE_SELECTED_FILTER_ITEM: 'UPDATE_SELECTED_FILTER_ITEM',
  SELECT_FILTER_TAB: 'SELECT_FILTER_TAB',
  Selected_Tags_Index: 'Selected_Tags_Index',
  Selected_Price_Range: 'Selected_Price_Range',
  UPDATE_SELECTED_RESTAURANT_COUNT: 'UPDATE_SELECTED_RESTAURANT_COUNT',
  UPDATE_SORT: 'UPDATE_SORT',
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',
  SET_SEARCH_VALUE: 'SET_SEARCH_VALUE',
  UPDATE_USER_REWARDS: 'UPDATE_USER_REWARDS',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SHOW_HIDE_MENU: 'SHOW_HIDE_MENU',
  UPDATE_USER_AND_TOKEN: 'UPDATE_USER_AND_TOKEN',
  UPDATE_REVIEW_DATA: 'UPDATE_REVIEW_DATA',
  UPDATE_USER_REVIEW: 'UPDATE_USER_REVIEW',
  HIDE_FILTER_FAB_ICON: 'HIDE_FILTER_FAB_ICON',
  toggleFilterMenu: value => ({
    type: globalActions.TOGGLE_FILTER_MENU,
    drawerOpen: value.drawerOpen
  }),
  toggleFilterAccordion: value => ({
    type: globalActions.TOGGLE_FILTER_ACCORDION,
    selectedFilterAccordion: value.selectedFilterAccordion
  }),
  selectedTagsIndex: value => ({
    type: globalActions.Selected_Tags_Index,
    selectedTagsItems: value.selectedTagsItems
  }),
  selectedPriceRange: value => ({
    type: globalActions.Selected_Price_Range,
    selectedPriceRangeItem: value.selectedPriceRangeItem
  }),
  updateStoreWithQuery: queryParams => ({
    type: globalActions.UPDATE_STORE_WITH_QUERY,
    queryParams
  }),
  updateSelectedFilterItem: (filter, filterValue) => ({
    type: globalActions.UPDATE_SELECTED_FILTER_ITEM,
    filter,
    filterValue
  }),
  selectFilterTab: selectedFilterTab => ({
    type: globalActions.SELECT_FILTER_TAB,
    selectedFilterTab
  }),
  updateSelectedRestaurantCount: (selectedType, restaurants) => ({
    type: globalActions.UPDATE_SELECTED_RESTAURANT_COUNT,
    selectedType,
    restaurants
  }),
  updateSort: (sortValue, sortDirection) => ({
    type: globalActions.UPDATE_SORT,
    sortValue,
    sortDirection
  }),
  setCurrentLocation: location => ({
    type: globalActions.SET_CURRENT_LOCATION,
    location
  }),
  setSearchValue: value => ({
    type: globalActions.SET_SEARCH_VALUE,
    value
  }),
  updateUserRewards: userRewards => ({
    type: globalActions.UPDATE_USER_REWARDS,
    userRewards
  }),
  clearSelectedFilters: (filter, filterValue) => ({
    type: globalActions.CLEAR_FILTERS,
    filter,
    filterValue
  }),
  showHideMenu: (hideMenu, scrollValue) => ({
    type: globalActions.SHOW_HIDE_MENU,
    hideMenu,
    scrollValue
  }),
  updateUserAndToken: data => ({
    type: globalActions.UPDATE_USER_AND_TOKEN,
    data
  }),
  updateReviewData: tagsData => ({
    type: globalActions.UPDATE_REVIEW_DATA,
    tagsData
  }),
  updateUserReview: review => ({
    type: globalActions.UPDATE_USER_REVIEW,
    review
  }),
  hideFilterFabIcon: value => ({
    type: globalActions.HIDE_FILTER_FAB_ICON,
    value
  })
};

export default globalActions;
