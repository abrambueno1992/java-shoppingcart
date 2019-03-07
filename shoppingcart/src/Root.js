import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
const middleware = [thunk];

export default ({ children }) => {
  return (
    <Provider
      store={createStore(
        reducers,
        composeWithDevTools(applyMiddleware(...middleware))
      )}
    >
      {children}
    </Provider>
  );
};

