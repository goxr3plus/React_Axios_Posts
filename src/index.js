import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

var requestIntercepton = axios.interceptors.request.use(
  request => {
    console.log(request);
    //Edit request config
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

var responseIntercepton = axios.interceptors.response.use(
  response => {
    console.log(response);
    //Edit response config
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

//Eject Interceptors ---- comment if your want to use them
// axios.interceptors.request.eject(requestIntercepton);
// axios.interceptors.response.eject(responseIntercepton);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
