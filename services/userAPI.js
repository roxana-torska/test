import request from "../utils/request";

const API_URL = "";

export const userAPI = {
	login: async function (payload) {
		let params = { ...payload.params };
		let response = await request(`${API_URL}/users/login`, {
			method: "POST",
			body: {
				...params
			}
		});
		return response.data;
	}
};
