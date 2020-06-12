import { LIST_DISHES } from "../actions/types";
const intialState = [];

export default function DishesReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIST_DISHES:
      return payload;

    default:
      return state;
  }
}
