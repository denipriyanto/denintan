// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}", // for app router
    ],
    theme: {
        extend: {
            spacing: {
                0: "0",
                20: "1.2500rem",
                34: "2.1250rem",
                40: "2.5000rem",
                60: "3.7500rem",
            },
        },
    },
    plugins: [],
};
