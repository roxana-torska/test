const userActions = {
  USER_LOGIN: 'USER_LOGIN',
  USER_RECEIVED: 'USER_RECEIVED',
  USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',
  USER_SIGN_UP: 'USER_SIGN_UP',
  USER_SIGN_UP_ERROR: 'USER_SIGN_UP_ERROR',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGOUT_RECEIVED: 'USER_LOGOUT_RECEIVED',
  USER_LOGOUT_ERROR: 'USER_LOGOUT_ERROR',
  userLogin: userData => ({
    type: userActions.USER_LOGIN,
    loading: true,
    email: userData.email,
    password: userData.password
  }),
  receivedUser: userData => ({
    type: userActions.USER_RECEIVED,
    loading: true,
    user: userData
  }),
  errorUserLogin: error => ({
    type: userActions.USER_LOGIN_ERROR,
    loading: false,
    error
  }),
  userLogout: userData => ({
    type: userActions.USER_LOGOUT,
    loading: true,
    user: userData
  }),
  userLogoutReceived: userData => ({
    type: userActions.USER_LOGOUT_RECEIVED,
    loading: false,
    user: userData
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
  errorUserSignUp: error => ({
    type: userActions.USER_SIGN_UP_ERROR,
    loading: false,
    error
  })
};

export default userActions;
