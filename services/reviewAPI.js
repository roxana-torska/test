import request from "../utils/request";
import { API_URL } from "../utils/config";
import { setToken, getDecodedToken } from "../utils/common";

export const reviewAPI = {
  postReview: async function (payload) {
    let { token, reviewText, dishId, score } = payload;
    let url = `${API_URL}/review/`;
    let userId = getDecodedToken(token).user_id;
    console.log(userId);
    let response = await request(url, {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      body: {
        review: {
          reviewText,
          dishId,
          userId: userId,
          score: score,
        },
      },
    });
    console.log(response);
    return response;
  },
  getReviews: async function (payload) {
    console.log("user id inside getReviews===>", payload);
    const url = `${API_URL}/review`;
    const token = payload.token;
    let response = await request(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status.toLowerCase() === "ok") {
      return response.data;
    } else {
    }
  },
  getLatestReview: async function () {
    const url = `${API_URL}/review/get-reviews`;
    let response = await request(url, {});
    return response.data;
  },
};
