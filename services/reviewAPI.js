import request from '../utils/request';
import { API_URL } from '../utils/config';

export const reviewAPI = {
  addAndUpdateReview: async function(payload) {
    let { token, ...params } = payload.params;
    let response = await request(`${API_URL}/reviews/update-dish-review`, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
      body: {
        ...params
      }
    });
    return response;
  }
};
