/* eslint-disable no-use-before-define */
import React from "react";
import { createRoot } from "react-dom/client";
import Test from "./__test__/Test";
// import "antd/dist/reset.css"; // moved into @layer in tailwind.css
// import "./scss/index.scss";
import "./styles/tailwind.css";
import "./styles/style.css";

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