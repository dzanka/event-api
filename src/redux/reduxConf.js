import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import freeze from "redux-freeze";

const crashReporter = () => (next) => async (action) => {
  try {
    return await Promise.resolve(next(action));
  } catch (err) {
    // here can go any other automated error handling
    // - such as displaying error messages to user, if they come from BE
    // - or sending to some external logging tool
    console.error(err);
    next({ type: "ERROR" });
  }
  return undefined;
};

const middlewares = [];
middlewares.push(crashReporter);
middlewares.push(thunk);

// freeze is only for development env
if (process.env.NODE_ENV !== "production") {
  middlewares.push(freeze);
}

let middleware = applyMiddleware(...middlewares); // eslint-disable-line
// add the redux dev tools
if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default middleware;
