import request from '../utils/request';
import { API_URL } from '../utils/config';
import { stringify } from 'qs';

export const rewardAPI = {
  getRewards: async function(payload) {
    let token = payload.token;
    let response = await request(`${API_URL}/systemRewards/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.status.toLowerCase() === 'ok') {
      return response.data;
    } else {
      return [];
    }
  },
  reedmedReward: async function(payload) {
    const token = payload.token;
    const params = {
      rewardId: payload.rewardId
    };
    let response = await request(`${API_URL}/rewards/redeem`, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
      body: {
        ...params
      }
    });
    return response;
  }
};
