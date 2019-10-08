import restaurantsAction from './actions';
import { all, takeEvery,put } from 'redux-saga/effects'
export function* setRestaurants(response) {
	console.log("response====>", response);
	yield takeEvery(restaurantsAction.SET_RESTAURANTS, function* (response) {
		console.log("inside restaurants midleware")
		yield put(restaurantsAction.setRestaurants({ data: response.data }));
	});
}
