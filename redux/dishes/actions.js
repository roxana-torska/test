import { LIST_DISHES } from "./types";
import axios from "axios";

export const listDishes = () => (dispatch) => {
  axios
    .get("/dishes", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((info) => {
      console.log(info);
      dispatch({
        type: LIST_DISHES,
        payload: info,
      });
    });
};
