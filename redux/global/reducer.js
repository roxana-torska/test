import actions from './actions';
import { getLocation } from '../../utils/common';

export function globalReducer(state = {
  drawerOpen: false,
  selectedFilterAccordion: '',
  selectedTagsItems: [],
  selectedPriceRangeItem: '',
  selectedPageTab: -1,
  selectedFilterTab: 0,
  filters: {
    tags: [],
    price: '',
    distanceToMe: '',
    searchBy: 'Everywhere',
    location: { lng: '', lat: '' }
  },
  sort: 'rate',
  direction: 'dsc',
  location: { lng: '', lat: '', address: '' },
  searchText: '',
  isLoggedIn: false,
  user: {},
  userRewards: [],
  hideMainMenu: true,
  scrollValue: 0,
  token: null,
  reviewsData: {
    likes: '',
    dislikes: '',
    ratings: 0,
    valueForMoney: 0,
    taste: 0,
    lookAndFeel: 0,
    description: ''
  },
  userReviews: [],
  systemTags: [],
  lastRatedDish: '',
  defaultRefferal: null,
  hideFabIcon: false
}, action) {
  switch (action.type) {
    case actions.TOGGLE_FILTER_MENU:
      return {
        ...state,
        drawerOpen: action.drawerOpen,
      }
    case actions.TOGGLE_FILTER_ACCORDION:
      return {
        ...state,
        selectedFilterAccordion: action.selectedFilterAccordion
      }
    case actions.UPDATE_STORE_WITH_QUERY: {
      let filters = state.filters;
      filters = { ...filters, ...action.queryParams.filters };
      const {
        selectedPageTab,
        sort,
        direction,
        searchText,
        isLoggedIn,
        user,
        location,
        loggedInToken,
        systemTags
      } = action.queryParams;
      return {
        ...state,
        filters,
        selectedPageTab,
        sort: sort ? sort : "rate",
        direction: direction ? direction : "dsc",
        searchText,
        isLoggedIn,
        user,
        location: { ...location },
        token: loggedInToken,
        systemTags,


      }


    }
    case actions.UPDATE_SELECTED_FILTER_ITEM: {
      let filters = { ...state.filters };
      filters[action.filter] = action.filterValue.filterValue;
      return {
        ...state,
        filters: { ...filters }
      }
    }
    case actions.SELECT_FILTER_TAB:
      return {
        ...state,
        selectedFilterTab: action.selectedFilterTab,
      }
    case actions.Selected_Tags_Index: {
      return {
        ...state,
        selectedTagsItems: action.selectedTagsItems ? action.selectedTagsItems : [],
      }

    }
    case actions.Selected_Price_Range:
      return {
        ...state,
        selectedPriceRangeItem: action.selectedPriceRangeItem ? action.selectedPriceRangeItem : ""
      }
    case actions.UPDATE_SORT:
      return {
        ...state,
        sort: action.sortValue,
        direction: action.sortDirection,
      }
    case actions.SET_CURRENT_LOCATION:
      if (action.location) {
        return {
          ...state,
          location: { ...action.location }
        }

      } else {
        return {
          ...state,
          location: { lng: "", lat: "", address: "" }
        }
      }
    case actions.SET_SEARCH_VALUE:
      return {
        ...state,
        searchText: action.value,
      }

    case actions.UPDATE_USER_REWARDS:
      return {
        ...state,
        userRewards: action.userRewards
      }
    case actions.CLEAR_FILTERS:
      let filters = state.filters;
      filters[action.filter] = action.filterValue;
      return {
        ...state,
        filters: { ...filters }
      }
    case actions.SHOW_HIDE_MENU:
      return {
        ...state,
        hideMainMenu: action.hideMenu,
        scrollValue: action.scrollValue,
      }

    case actions.UPDATE_USER_AND_TOKEN:
      return {
        ...state,
        user: action.data.user,
        token: action.data.token,
      }

    case actions.UPDATE_REVIEW_DATA:
      return {
        ...state,
        reviewsData: { ...action.tagsData.tempReviews }
      }
    case actions.UPDATE_USER_REVIEW:
      console.log("dish id at reducer ===>", action.review);
      let userReviews = state.userReviews;
      userReviews = action.review;
      return {
        ...state,
        userReviews: [...userReviews],
        lastRatedDish: action.review.typeId,
      }
    case actions.HIDE_FILTER_FAB_ICON:
      return {
        ...state,
        hideFabIcon: action.value,
      }
    default:
      return state;
  }
}
