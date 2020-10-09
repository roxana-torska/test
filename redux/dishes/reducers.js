import { GET_DISHES, SEARCH_DISHES, CLEAR } from "./types";

const intialState = { dishes: [] };

export default function DishesReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DISHES:
      return {
        ...state,
        dishes: payload,
      };
    case SEARCH_DISHES:
      return payload;
    case CLEAR:
      return payload;

    default:
      return state;
  }
}
