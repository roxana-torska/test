import request from '../utils/request';
import { API_URL } from '../utils/config';
import { stringify } from 'qs';
import { async } from 'rxjs/internal/scheduler/async';

export const globalAPI = {
  getPriceRange: async function() {
    let response = await request(`${API_URL}/public/price-range`, {});
    if (response.status.toLowerCase() === 'ok') {
      return response.data;
    } else {
      return [];
    }
  },
  getDistance: async function(payload) {
    let response = await request(
      `${API_URL}/public/distance-to-me?${stringify(payload)}`,
      {}
    );
    if (response.status.toLowerCase() === 'ok') {
      return response.data;
    } else {
      return [];
    }
  },
  addContributeData: async function(payload) {
    const params = {
      userId: payload.userId,
      restaurantName: payload.restaurantName,
      dishName: payload.dishName,
      city: payload.city,
      dishScore: payload.dishScore
    };
    let response = await request(`${API_URL}/public/contribute`, {
      method: 'POST',
      body: {
        ...params
      }
    });
    return response;
  },
  getSearchBy: async function(payload) {
    let response = await request(`${API_URL}/public/search-by`);
    if (response.status.toLowerCase() === 'ok') {
      return response.data;
    } else {
      return [];
    }
  },
  addReservationRequest: async function(payload) {
    let params = { ...payload.params };
    let response = await request(`${API_URL}/public/reservation-request`, {
      method: 'POST',
      body: {
        ...params
      }
    });
    return response;
  },
  saveImage: async function(token, payload) {
    let params = { ...payload.params };
    let response = await request(`${API_URL}/public/save-capture-image`, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
      body: {
        ...params
      }
    });
    return response;
  }
};
