/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render } from "react-dom";
import reportWebVitals from "./__test__/reportWebVitals";
import Test from "./__test__/Test";
import "antd/dist/reset.css";
// import "./scss/index.scss";
import "./styles/tailwind.css";
import "./styles/style.css";

import { ConfigProvider } from "antd";

// Suppress ResizeObserver loop limit exceeded error
// This is a known issue with Ant Design components and is generally benign.
const originalError = console.error;
console.error = (...args) => {
    if (/ResizeObserver loop/.test(args[0])) {
        return;
    }
    originalError.call(console, ...args);
};

window.addEventListener("error", (e) => {
    // Check for ResizeObserver loop errors
    const msg = e.message || "";
    if (msg.includes("ResizeObserver loop")) {
        e.stopImmediatePropagation();
        e.preventDefault(); // Prevent standard error logging
    }
});

// Also suppress unhandled rejections which sometimes wrap these errors
window.addEventListener("unhandledrejection", (e) => {
    const msg = e.reason?.message || "";
    if (msg.includes("ResizeObserver loop")) {
        e.stopImmediatePropagation();
        e.preventDefault();
    }
});

render(
    <ConfigProvider
        theme={{
            token: {
                fontFamily: "var(--app-font)",
            },
        }}
    >
        <Test />
    </ConfigProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
