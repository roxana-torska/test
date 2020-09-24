const userActions = {
  USER_LOGIN: "USER_LOGIN",
  USER_RECEIVED: "USER_RECEIVED",
  USER_LOGIN_ERROR: "USER_LOGIN_ERROR",
  USER_SIGN_UP: "USER_SIGN_UP",
  USER_SIGN_UP_ERROR: "USER_SIGN_UP_ERROR",
  USER_LOGOUT: "USER_LOGOUT",
  USER_LOGOUT_RECEIVED: "USER_LOGOUT_RECEIVED",
  USER_LOGOUT_ERROR: "USER_LOGOUT_ERROR",
  USER_RECOVERY_PASSWORD: "USER_RECOVERY_PASSWORD",
  USER_RECOVERY_PASSWORD_ERROR: "USER_RECOVERY_PASSWORD_ERROR",
  USER_RECOVERY_PASSWORD_RECEIVED: "USER_RECOVERY_PASSWORD_RECEIVED",
  CHECK_RECOVERY_TOKEN: "CHECK_RECOVERY_TOKEN",
  CHECK_RECOVERY_TOKEN_RECEIVED: "CHECK_RECOVERY_TOKEN_RECEIVED",
  CHECK_RECOVERY_TOKEN_ERROR: "CHECK_RECOVERY_TOKEN_ERROR",
  userLogin: (userData) => ({
    type: userActions.USER_LOGIN,
    user: userData,
    loading: false,
  }),
  receivedUser: (userData) => ({
    type: userActions.USER_RECEIVED,
    loading: true,
    user: userData,
  }),
  errorUserLogin: (error) => ({
    type: userActions.USER_LOGIN_ERROR,
    loading: false,
    error,
  }),
  userLogout: (userData) => ({
    type: userActions.USER_LOGOUT,
    loading: true,
    user: userData,
  }),
  userLogoutReceived: (userData) => ({
    type: userActions.USER_LOGOUT_RECEIVED,
    loading: false,
    user: userData,
  }),
  errorUserLogout: (error) => ({
    type: userActions.USER_LOGOUT_ERROR,
    loading: false,
    error,
  }),
  userSignUp: (userData) => ({
    type: userActions.USER_SIGN_UP,
    loading: true,
    ...userData,
  }),
  errorUserSignUp: (error) => ({
    type: userActions.USER_SIGN_UP_ERROR,
    loading: false,
    error,
  }),
  userRecoveryPassword: (email) => ({
    type: userActions.USER_RECOVERY_PASSWORD,
    loading: true,
    email: email,
  }),
  userRecoveryPasswordReceived: (status) => ({
    type: userActions.USER_RECOVERY_PASSWORD_RECEIVED,
    loading: false,
    user: status,
  }),
  userRecoveryPasswordError: (error) => ({
    type: userActions.USER_SIGN_UP_ERROR,
    loading: false,
    error,
  }),
  checkRecoveryToken: (token) => ({
    type: userActions.CHECK_RECOVERY_TOKEN,
    loading: true,
    token: token,
  }),
  checkRecoveryTokenReceived: (data) => ({
    type: userActions.CHECK_RECOVERY_TOKEN_RECEIVED,
    loading: false,
    isTokenValid: data.isTokenValid,
  }),
  checkRecoveryTokenError: (error) => ({
    type: userActions.USER_RECOVERY_PASSWORD_ERROR,
    loading: false,
    error,
  }),
};

export default userActions;
