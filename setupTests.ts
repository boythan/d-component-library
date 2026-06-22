// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Messages.ts reads document.documentElement.lang to pick the locale.
// jsdom sets lang="" (empty string) so "en" fallback via ?? never triggers.
document.documentElement.lang = "en";

// Ant Design uses ResizeObserver internally; jsdom does not include it
global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};

// Ant Design's responsiveObserver (used by Timeline, Grid, etc.) calls window.matchMedia
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    }),
});
