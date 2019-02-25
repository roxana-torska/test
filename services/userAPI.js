import request from '../utils/request';

const API_URL = 'http://localhost:8282/api';

export const userAPI = {
  handleLogin: async function (payload) {
    let params = { ...payload.params };
    let response = await request(`/sign-in`, {
      method: 'POST',
      body: {
        ...params
      }
    });
    return response.data;
  },
  login: async function (payload) {
    let params = { ...payload.params };
    let response = await request(`${API_URL}/users/sign-in`, {
      method: 'POST',
      body: {
        ...params
      }
    });
    return response.data;
  },
  signUp: async function (payload) {
    let params = { ...payload.params };
    console.log('api params', params);
    let response = await request(`${API_URL}/users/sign-up`, {
      method: 'POST',
      body: {
        ...params
      }
    });
    return response.data;
  },
  recoveryPassword: async function (payload) {
    let params = { ...payload.params };
    let response = await request(`${API_URL}/users/forget-password`, {
      method: 'POST',
      body: {
        ...params
      }
    });
    return response.data;
  },
  checkRecoveryToken: async function (payload) {
    let { token } = payload.params;
    console.log('recovery token params', token);
    let response = await request(
      `${API_URL}/public/check-reset-token/${token}`
    );
    console.log('api response', response);
    return response.data;
  }
};
