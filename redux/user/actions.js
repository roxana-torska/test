const userActions = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_RECEIVED: 'USER_LOGIN_RECEIVED',
  USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',
  USER_SIGN_UP: 'USER_SIGN_UP',
  USER_SIGN_UP_RECEIVED: 'USER_SIGN_UP_RECEIVED',
  USER_SIGN_UP_ERROR: 'USER_SIGN_UP_ERROR',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGOUT_RECEIVED: 'USER_LOGOUT_RECEIVED',
  USER_LOGOUT_ERROR: 'USER_LOGOUT_ERROR',
  userLogin: userData => ({
    type: userActions.USER_LOGIN,
    loading: true,
    username: userData.username,
    password: userData.password
  }),
  receivedUserLogin: token => ({
    type: userActions.USER_LOGIN_RECEIVED,
    loading: true,
    token: token
  }),
  errorUserLogin: error => ({
    type: userActions.USER_LOGIN_ERROR,
    loading: false,
    error
  }),
  userLogout: token => ({
    type: userActions.USER_LOGOUT,
    loading: true,
    token: token
  }),
  userLogoutReceived: token => ({
    type: userActions.USER_LOGOUT_RECEIVED,
    loading: false,
    token: token
  }),
  errorUserLogout: error => ({
    type: userActions.USER_LOGOUT_ERROR,
    loading: false,
    error
  }),
  userSignUp: userData => ({
    type: userActions.USER_SIGN_UP,
    loading: true,
    ...userData
  }),
  receivedUserSignUp: token => ({
    type: userActions.USER_SIGN_UP_RECEIVED,
    loading: true,
    token: token
  }),
  errorUserSignUp: error => ({
    type: userActions.USER_SIGN_UP_ERROR,
    loading: false,
    error
  })
};

export default userActions;
