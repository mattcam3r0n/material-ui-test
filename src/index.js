import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// for material-ui
import "typeface-roboto";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

