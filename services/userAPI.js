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
  },
  resetPassword: async function(payload) {
    let params = { ...payload.params };
    const { token } = params;
    const tempParams = {
      password: params.password,
      confirmPassword: params.confirmPassword
    };
    let response = await request(
      `${API_URL}/public/reset-password?token=${token}`,
      {
        method: 'POST',
        body: {
          ...tempParams
        }
      }
    );
    return response.data;
  },
  getRestaurants: async function(payload) {
    console.log('payload', payload);
    let {
      name,
      location: { lat, lng }
    } = payload;
    let response = await request(
      `${API_URL}/restaurants/autocomplete?name=${name}&lat=${lat}&lng=${lng}`
    );
    return response.data;
  }
};
