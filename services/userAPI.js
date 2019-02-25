import request from '../utils/request';
import { API_URL } from '../utils/config';

export const userAPI = {
  handleLogin: async function(payload) {
    let params = { ...payload.params };
    let response = await request(`/sign-in`, {
      method: 'POST',
      body: {
        ...params
      }
    });
    return response.data;
  },
  login: async function(payload) {
    let params = { ...payload.params };
    let response = await request(`${API_URL}/users/sign-in`, {
      method: 'POST',
      body: {
        ...params
      }
    });
    return response.data;
  },
  signUp: async function(payload) {
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
  recoveryPassword: async function(payload) {
    let params = { ...payload.params };
    let response = await request(`${API_URL}/users/forget-password`, {
      method: 'POST',
      body: {
        ...params
      }
    });
    return response.data;
  }
};
