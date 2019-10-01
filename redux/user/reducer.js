import { getDecodedToken } from '../../utils/common';
import actions from './actions';
import { Map } from 'immutable';
const initState = new Map({
  user: null,
  loading: false,
  error: null,
  isTokenValid: null
});

const hydrateUser = function () {
  const userData = getDecodedToken();
  if (userData) {
    console.log("inside user reducer:==========>", userData);
    return initState.set('user', userData);
  } else {
    return initState;
  }
};

export function userReducer(state = hydrateUser(), action) {
  console.log('reducer action======>', action.user);
  let { loading, error } = action;
  switch (action.type) {
    case actions.USER_LOGIN:
    case actions.USER_LOGOUT:
    case actions.USER_SIGN_UP:
    case actions.USER_RECOVERY_PASSWORD:
    case actions.CHECK_RECOVERY_TOKEN:
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
    case actions.USER_RECOVERY_PASSWORD_RECEIVED:
      console.log('action recovery received', action.status);
      return state
        .set('user', action.status)
        .set('loading', false)
        .set('error', null);
    case actions.CHECK_RECOVERY_TOKEN_RECEIVED:
      console.log('***token***', action.isTokenValid);
      return state
        .set('isTokenValid', action.isTokenValid)
        .set('loading', false)
        .set('error', null);
    case actions.USER_LOGIN_ERROR:
    case actions.USER_LOGOUT_ERROR:
      return state
        .set('loading', false)
        .set('user', null)
        .set('error', error);
    case actions.USER_SIGN_UP_ERROR:
      return state
        .set('loading', false)
        .set('user', null)
        .set('error', error);
    case actions.USER_RECOVERY_PASSWORD_ERROR:
      return state
        .set('loading', false)
        .set('error', error)
        .set('user', null);
    case actions.CHECK_RECOVERY_TOKEN_ERROR:
      console.log('****recovery error****', error);
      return state
        .set('loading', false)
        .set('user', null)
        .set('error', error);
    default:
      return state;
  }
}
