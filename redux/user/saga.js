import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { push } from 'react-router-redux';
import { userAPI } from '../../services/userAPI';
import { setToken } from '../../utils/common';

export function* login() {
  yield takeEvery(actions.USER_LOGIN, function*(payload) {
    let { username, password } = payload;
    let response = yield call(userAPI.login, {
      params: {
        username,
        password
      }
    });
    if (response.status.toUpperCase() === 'OK') {
      yield call(setToken, response);
      yield put(actions.receivedUserLogin(response.token));
      yield put(push('/'));
    } else {
      yield call(setToken, null);
      yield put(actions.errorUserLogin(response.error));
    }
  });
}

export function* signUp() {
  yield takeEvery(actions.USER_SIGN_UP, function*(payload) {
    console.log('sign-up saga', payload);
    let { email, password, confirmPassword } = payload;
    let response = yield call(userAPI.signUp, {
      params: {
        email,
        password,
        confirmPassword
      }
    });
    console.log('sign-up response', response);
    if (response.status.toUpperCase() === 'OK') {
      yield call(setToken, response);
      yield put(actions.receivedUserSignUp(response.data.token));
      yield put(push('/'));
    } else {
      yield call(setToken, null);
      yield put(actions.errorUserSignUp(response.error));
    }
  });
}

export function* logout() {
  yield takeEvery(actions.USER_LOGOUT, function*(payload) {
    yield call(setToken, null);
    yield put(actions.userLogoutReceived(response.token));
    yield put(push('/user/login'));
  });
}

export default function* rootSaga() {
  yield all([fork(login), fork(logout), fork(signUp)]);
}
