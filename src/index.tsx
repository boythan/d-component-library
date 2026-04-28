/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./__test__/reportWebVitals";
import Test from "./__test__/Test";
// import "antd/dist/reset.css"; // moved into @layer in tailwind.css
// import "./scss/index.scss";
import "./styles/tailwind.css";
import "./styles/style.css";

import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import DThemeProvider from "./components/theme/DThemeProvider";

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

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <DThemeProvider theme={{ token: { colorPrimary: "#de0d0c", fontFamily: "var(--app-font)" } }}>
            <Test />
        </DThemeProvider>,
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
