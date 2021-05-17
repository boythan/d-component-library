/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render } from "react-dom";
import reportWebVitals from "./__test__/reportWebVitals";
import Test from "./__test__/Test";
import "./scss/index.scss";

render(<Test />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
