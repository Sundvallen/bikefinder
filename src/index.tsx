import React from "react";
import ReactDOM from "react-dom";
import App from "./features/app/App";
import { Provider } from "react-redux";
import store from "./app/store";

// Run React 17 as React 18 will break Mapbox
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.querySelector("#root")
);
