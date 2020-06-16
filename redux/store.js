import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';
import rootSaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import logger from 'redux-logger';

import { call } from 'redux-saga/effects';
import { func } from 'prop-types';

const initStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [logger, thunk, sagaMiddleware];
  function saveToLocalStorage(state) {
    try {
      const serielizedState = JSON.stringify(state);
      localStorage.setItem("state", serielizedState);

    } catch (e) {
      console.log("error ===>", e);
    }
  }
  function loadFromLocalStorage() {
    try {
      const serielizedState = localStorage.getItem("state");
      if (serielizedState == null) {
        return undefined
      }
      return JSON.parse(serielizedState);
    } catch (e) {
      return undefined
    }
  }
  const persitedStore = loadFromLocalStorage();
  const store = createStore(
    combineReducers({
      ...reducers
    }),
    persitedStore,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  store.subscribe(() => {
    return saveToLocalStorage(store.getState());
  })
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
  store.runSaga = () => {
    store.sagaTask = sagaMiddleware.run(mySaga);
  };

  store.stopSaga = async () => {
    // Avoid running twice
    if (!store.saga) return;
    store.dispatch(END);
    await store.saga.done;
    store.saga = null;
  };

  store.execSagaTasks = async (isServer, tasks) => {
    // run saga
    store.runSaga();
    // dispatch saga tasks
    tasks(store.dispatch);
    // Stop running and wait for the tasks to be done
    await store.stopSaga();
    // Re-run on client side
    if (!isServer) {
      store.runSaga();
    }
  };

  // run the rootSaga initially
  store.runSaga();

  return store;
};

export { initStore };
