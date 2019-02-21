import { getDecodedToken } from '../../utils/common';
import actions from './actions';
import { Map } from 'immutable';
const initState = new Map({
  user: null,
  loading: false,
  error: null
});

const hydrateUser = function() {
  const userData = getDecodedToken();
  if (userData) {
    return initState.set('user', userData);
  } else {
    return initState;
  }
};

export function userReducer(state = hydrateUser(), action) {
  console.log('reducer action', action);
  let { loading, error } = action;
  switch (action.type) {
    case actions.USER_LOGIN:
    case actions.USER_LOGOUT:
    case actions.USER_SIGN_UP:
      return state.set('loading', loading).set('error', null);
    case actions.USER_RECEIVED:
      return state
        .set('user', action.user || null)
        .set('loading', false)
        .set('error', null);
    case actions.USER_LOGOUT_RECEIVED:
      return state
        .set('user', null)
        .set('loading', false)
        .set('error', null);
    case actions.USER_LOGIN_ERROR:
    case actions.USER_LOGOUT_ERROR:
      return state
        .set('loading', false)
        .set('user', null)
        .set('error', error);
    case actions.USER_SIGN_UP_ERROR:
      console.log('sign up error');
      return state
        .set('loading', false)
        .set('user', null)
        .set('error', error);
    default:
      console.log('invalid action');
      return state;
  }
}
