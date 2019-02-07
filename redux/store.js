import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import * as reducers from "./reducers";
import rootSaga from "./sagas";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import logger from "redux-logger";

import { call } from "redux-saga/effects";

const initStore = (initialState = {}) => {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [logger, thunk, sagaMiddleware];

	const store = createStore(
		combineReducers({
			...reducers
		}),
		composeWithDevTools(applyMiddleware(...middlewares))
	)

	// autoRestart saga when any exception in any saga
	function autoRestart(generator) {
		return function* autoRestarting(...args) {
			while (true) {
				try {
					yield call(generator, ...args);
				} catch (e) {
					console.error(`Unhandled error in '${generator.name}'`, e);
				}
			}
		};
	}
	const mySaga = autoRestart(rootSaga);
	store.runSagaTask = () => {
		store.sagaTask = sagaMiddleware.run(mySaga)
	}
	// run the rootSaga initially
	store.runSagaTask()

	return store;
};

export { initStore };
