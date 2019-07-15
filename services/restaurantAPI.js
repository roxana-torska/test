import request from '../utils/request';
import { API_URL } from '../utils/config';
import { stringify } from 'qs';
import { async } from 'rxjs/internal/scheduler/async';
import { func } from 'prop-types';

export const restaurantAPI = {
	getRestaurants: async function (payload) {
		const queryParams = stringify(payload, { encodeValuesOnly: true });
		let response = await request(`${API_URL}/restaurants/?${queryParams}`);
		if (response.status.toLowerCase() === 'ok') {
			return response.data;
		} else {
			return [];
		}
	},
	searchRestaurants: async function (payload) {
		const queryParams = stringify(payload, { encodeValuesOnly: true });
		let response = await request(
			`${API_URL}/restaurants/search/?${queryParams}`
		);
		if (response.status.toLowerCase() === 'ok') {
			return response.data;
		} else {
			return [];
		}
	}
};
