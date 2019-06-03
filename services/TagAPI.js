import request from '../utils/request';
import { API_URL } from '../utils/config';
import { stringify } from 'qs';

export const tagAPI = {
  getTags: async function(payload) {
    let response = await request(
      `${API_URL}/tags/with-counts?${stringify(payload)}`,
      {}
    );
    if (response.status.toLowerCase() === 'ok') {
      return response.data;
    } else {
      return [];
    }
  }
};
