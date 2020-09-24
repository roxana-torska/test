import { all, fork } from "redux-saga/effects";
import * as userSagas from "./user/saga";
import * as restaurantsSaga from "./restaurants/restaurantSaga";

export default function* rootSaga(getState) {
  yield all(
    [...Object.values(userSagas), ...Object.values(restaurantsSaga)].map(fork)
  );
}
