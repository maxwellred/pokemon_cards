import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import "./style/main.scss";

//this is code-splitting and lazy loading

import(/* webpackChunkName: 'app' */ "./components/App.js").then(
  ({ default: App }) => render(<App />, document.getElementById("root"))
);
