import request from '../utils/request';
import { API_URL } from '../utils/config';
import { stringify } from 'qs';
import { async } from 'rxjs/internal/scheduler/async';


export const restaurantAPI = {
	getRestaurants: async function (payload) {
		const queryParams = stringify(payload, { encodeValuesOnly: true });
		let response = await request(`/restaurants/?${queryParams}`);
		if (response.status.toLowerCase() === 'ok') {
			return response.data;
		} else {
			return [];
		}
	},
	searchRestaurants: async function (payload) {
		const queryParams = stringify(payload, { encodeValuesOnly: true });
		let response = await request(
			`/restaurants/search/?${queryParams}`
		);
		if (response.status.toLowerCase() === 'ok') {
			return response.data;
		} else {
			return [];
		}
	},
	getMenus: async (payload) => {
		let response = await request(
			`/restaurants/getMenus`
		);
		if (response.status.toLowerCase() === "ok") {
			return response.data
		} else {
			return []
		}
	},
	getDishes: async (payload) => {
		let token = payload.token;
		let url = `${API_URL}/dishes/get-dishes`

		let response = await request(url, {
			headers: { Authorization: `Bearer ${token}` },
			method: 'GET',
		});
		return response;
	},
	getCurrentRestaurant: async (payload) => {
		console.log("payload Id", payload)
		let params = { "res_id": payload }
		let response = await request(`${API_URL}/restaurants/get-restaurants-details`, {
			method: 'POST',
			body: {
				"res_id": payload
			}
		}
		);
		if (response.data) {
			console.log("response====>", response.data);
		}
		return response;
	}

};
