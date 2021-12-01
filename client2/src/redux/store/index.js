import { createStore, applyMiddleware } from "redux";
import { Reducers } from "../_reducers";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

export const Store = createStoreWithMiddleware(
  Reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
