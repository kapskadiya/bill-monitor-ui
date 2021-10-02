import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=UTF-8";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
