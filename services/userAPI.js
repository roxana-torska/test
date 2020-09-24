import request from "../utils/request";
import { API_URL } from "../utils/config";
import { getToken } from "../utils/config";

export const userAPI = {
  handleLogin: async function(payload) {
    let params = { ...payload.params };
    let response = await request(`/sign-in`, {
      method: "POST",
      body: {
        ...params,
      },
    });
    cl;
    return response;
  },
  login: async function(payload) {
    let params = { ...payload.params };
    let response = await request(`${API_URL}/users/sign-in`, {
      method: "POST",
      body: {
        ...params,
      },
    });

    return response;
  },
  signUp: async function(payload) {
    let params = { ...payload.params };

    let response = await request(`${API_URL}/users/sign-up`, {
      method: "POST",
      body: {
        ...params,
      },
    });
    return response;
  },
  recoverPassword: async function(payload) {
    let params = { ...payload.params };
    let response = await request(`${API_URL}/users/forget-password`, {
      method: "POST",
      body: {
        ...params,
      },
    });
    return response;
  },
  resetPassword: async function(payload) {
    let params = { ...payload.params };
    const { token } = params;
    const tempParams = {
      password: params.password,
      confirmPassword: params.confirmPassword,
    };
    let response = await request(
      `${API_URL}/public/reset-password?token=${token}`,
      {
        method: "POST",
        body: {
          ...tempParams,
        },
      }
    );
    return response;
  },
  getRestaurants: async function(payload) {
    let {
      name,
      location: { lat, lng },
    } = payload;
    lat = lat || "";
    lng = lng || "";
    let response = await request(
      `${API_URL}/restaurants/autocomplete?name=${name}&lat=${lat}&lng=${lng}`
    );
    return response;
  },
  updateUser: async function(payload) {
    let params = { ...payload.params };
    const tempParams = {
      fieldName: params.fieldName,
      fieldValue: params.fieldValue,
    };
    const token = params.token;
    let response = await request(`${API_URL}/users/update/`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      body: {
        ...tempParams,
      },
    });
    return response;
  },
  uploadProfileImage: async function(token, payload) {
    let params = { ...payload.params };
    let response = await request(`${API_URL}/users/upload-image/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
      method: "POST",
      body: {
        ...params,
      },
    });
    return response;
  },
};
