import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./setupTests.ts"],
        css: false,
        include: ["src/**/*.{test,spec}.{ts,tsx}"],
    },
});
