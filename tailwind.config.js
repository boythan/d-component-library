/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#DE0D0C",
                secondary: "#DE0D0C", // Matches SCSS $secondary-color
                success: "#33963D",
                info: "#17a2b8",
                warning: "#FAC256",
                danger: "#F44336",
                light: "#fff",
                dark: "#3d464d",
                muted: "#F5F5F5",
                "text-main": "#3D464D",
                "text-sub": "rgba(0, 0, 0, 0.56)",
            },
            fontFamily: {
                sans: ["var(--app-font)", "sans-serif"],
            },
            spacing: {
                18: "4.5rem", // 72px
            },
        },
    },
    plugins: [],
};
