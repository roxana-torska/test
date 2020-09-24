import request from "../utils/request";
import { API_URL } from "../utils/config";
import { stringify } from "qs";

export const dishesAPI = {
  getDishes: async (payload) => {
    let url = `${API_URL}/dishes/`;

    let response = await request(url, {
      method: "GET",
    });
    console.log(response);
    return response;
  },

  searchDishes: async function (searchTerm) {
    let url = `${API_URL}/search/${searchTerm}`;
    let response = await request(url, { method: "GET" });
    if (response.status.toLowerCase() === "ok") {
      console.log(response.status.toLowerCase());
      return response;
    } else {
      console.log(response.error);
      return [];
    }
  },
};
