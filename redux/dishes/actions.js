import { GET_DISHES, SEARCH_DISHES, CLEAR } from "./types";

import { dishesAPI } from "../../services/dishesAPI";

export const getDishes = () => (dispatch) => {
  dishesAPI.getDishes().then((info) => {
    dispatch({
      type: GET_DISHES,
      payload: info.data,
    });
  });
};

export const searchDishes = (searchTerm, force) => (dispatch) => {
  dishesAPI.searchDishes(searchTerm).then((info) => {
    dispatch({
      type: SEARCH_DISHES,
      payload: { info, searchTerm, force },
    });
  });
};
export const clearSearch = () => (dispatch) => {
  dishesAPI.getDishes().then((info) => {
    dispatch({
      type: CLEAR,
      payload: { info, searchTerm: null },
    });
  });
};
