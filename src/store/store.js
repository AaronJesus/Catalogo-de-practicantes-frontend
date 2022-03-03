import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { pracReducer } from "../reducers/pracReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  pracReducer,
  composeEnhancers(applyMiddleware(thunk))
);
