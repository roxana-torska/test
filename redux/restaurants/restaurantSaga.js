import restaurantsAction from './actions';
import {  takeEvery,put } from 'redux-saga/effects'
// export function* setRestaurants(data) {
// 	console.log("response====>", data);
// 	yield takeEvery(restaurantsAction.SET_RESTAURANTS, function* (data) {
// 		console.log("inside restaurants midleware=====>",data.data)
// 		yield put(restaurantsAction.setRestaurants({ data: data }));
// 	});
// }
