import request from '../utils/request';

const API_URL = 'http://localhost:8282/api';

export const userAPI = {
  login: async function(payload) {
    let params = { ...payload.params };
    let response = await request(`${API_URL}/users/login`, {
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
  }
};
