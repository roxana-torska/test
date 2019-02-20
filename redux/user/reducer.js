import { getToken } from '../../utils/common';
import actions from './actions';
import { Map } from 'immutable';
const initState = new Map({
  token: null,
  loading: false,
  error: null
});

const hydrateUser = function() {
  const token = getToken();
  if (token) {
    return initState.set('token', token);
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
    case actions.USER_LOGIN_RECEIVED:
      return state
        .set('token', action.token || null)
        .set('loading', false)
        .set('error', null);
    case actions.USER_LOGOUT_RECEIVED:
      return state
        .set('token', null)
        .set('loading', false)
        .set('error', null);
    case actions.USER_SIGN_UP_RECEIVED:
      return state
        .set('token', action.token || null)
        .ser('loading', false)
        .set('error', null);
    case actions.USER_LOGIN_ERROR:
    case action.USER_LOGOUT_ERROR:
      return state
        .set('loading', false)
        .set('token', null)
        .set('error', error);
    case action.USER_SIGN_UP_ERROR:
      return state
        .set('loading', false)
        .set('token', null)
        .set('error', error);
    default:
      return state;
  }
}
