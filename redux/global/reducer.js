import actions from './actions';
import { Map } from 'immutable';
import { getLocation } from '../../utils/common';
const initState = new Map({
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
});
const hydrateUser = function() {
  // const location = getLocation();
  return initState.set('drawerOpen', false);
};

export function globalReducer(state = hydrateUser(), action) {
  switch (action.type) {
    case actions.TOGGLE_FILTER_MENU:
      return state.set('drawerOpen', action.drawerOpen || false);
    case actions.TOGGLE_FILTER_ACCORDION:
      return state.set(
        'selectedFilterAccordion',
        action.selectedFilterAccordion || ''
      );
    case actions.UPDATE_STORE_WITH_QUERY: {
      let filters = state.get('filters');
      filters = { ...filters, ...action.queryParams.filters };
      return state
        .set('filters', filters)
        .set('selectedPageTab', action.queryParams.selectedPageTab)
        .set('sort', action.queryParams.sort || 'rate')
        .set('direction', action.queryParams.direction || 'dsc')
        .set('searchText', action.queryParams.searchText)
        .set('isLoggedIn', action.queryParams.isLoggedIn)
        .set('user', action.queryParams.user)
        .set('location', { ...action.queryParams.location })
        .set('token', action.queryParams.loggedInToken)
        .set('systemTags', action.queryParams.systemTags);
    }
    case actions.UPDATE_SELECTED_FILTER_ITEM: {
      let filters = { ...state.get('filters') };
      filters[action.filter] = action.filterValue.filterValue;
      return state.set('filters', { ...filters });
    }
    case actions.SELECT_FILTER_TAB:
      return state.set('selectedFilterTab', action.selectedFilterTab);
    case actions.Selected_Tags_Index: {
      return state.set('selectedTagsItems', action.selectedTagsItems || []);
    }
    case actions.Selected_Price_Range:
      return state.set(
        'selectedPriceRangeItem',
        action.selectedPriceRangeItem || ''
      );
    case actions.UPDATE_SORT:
      return state
        .set('sort', action.sortValue)
        .set('direction', action.sortDirection);
    case actions.SET_CURRENT_LOCATION:
      if (action.location) {
        return state.set('location', { ...action.location });
      } else {
        return state.set('location', { lng: '', lat: '', address: '' });
      }
    case actions.SET_SEARCH_VALUE:
      return state.set('searchText', action.value);
    case actions.UPDATE_USER_REWARDS:
      return state.set('userRewards', action.userRewards);
    case actions.CLEAR_FILTERS:
      let filters = state.get('filters');
      filters[action.filter] = action.filterValue;
      return state.set('filters', { ...filters });
    case actions.SHOW_HIDE_MENU:
      return state
        .set('hideMainMenu', action.hideMenu)
        .set('scrollValue', action.scrollValue);
    case actions.UPDATE_USER_AND_TOKEN:
      return state
        .set('user', action.data.user)
        .set('token', action.data.token);
    case actions.UPDATE_REVIEW_DATA:
      return state.set('reviewsData', { ...action.tagsData.tempReviews });
    case actions.UPDATE_USER_REVIEW:
      let userReviews = state.get('userReviews');
      userReviews[action.review.typeId] = action.review;
      return state
        .set('userReviews', { ...userReviews })
        .set('lastRatedDish', action.review.typeId);
    case actions.HIDE_FILTER_FAB_ICON:
      return state.set('hideFabIcon', action.value);
    default:
      return state;
  }
}
