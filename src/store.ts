import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import createReducer from "./reducers";
import logger from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import appHistory from "./tools/appHistory";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(
        promise(),
        thunk,
        routerMiddleware(appHistory), //for intercepting navigation actions
      )
    : composeWithDevTools(
        applyMiddleware(promise(), thunk, logger, routerMiddleware(appHistory)),
      );

export default createStore(createReducer(appHistory), middleware);
