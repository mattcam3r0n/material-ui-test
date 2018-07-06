import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./AppContainer";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import { Provider } from "react-redux";

// for material-ui
import "typeface-roboto";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
