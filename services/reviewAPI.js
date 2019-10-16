import request from '../utils/request';
import { API_URL } from '../utils/config';

export const reviewAPI = {
  addAndUpdateReview: async function (payload) {
    console.log("payload====>", payload);
    let { token, ...params } = payload;
    let url = `${API_URL}/review/update-dish-review`

    let response = await request(url, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
      body: {
        ...params
      }
    });
    return response;
  },
  getReviews: async function (payload) {
    console.log("user id inside getReviews===>", payload);
    const url = `${API_URL}/review`;
    const token = payload.token;
    let response = await request(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.status.toLowerCase() === 'ok') {
      return response.data;
    } else {
    }
  }
}

