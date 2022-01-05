import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import Routes from "./routes";
import { store } from "./reduxs";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "raf/polyfill";
import "babel-polyfill";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
