import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

ReactDOM.render(
  React.createElement(React.StrictMode, null, React.createElement(App)),
  document.getElementById("root")
);
