const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ["./index.html", './src/**/*.{js,jsx,ts,tsx}', "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",],
    theme: {
        extend: {
            colors: {
                primary: {DEFAULT:'#601EF9'},
                blue: {DEFAULT:'#237AFC'},
            },
            // borderRadius: {
            //     large: "24px",
            // }
            animation: {
                grid: "grid 120s linear infinite",
                ripple: "ripple var(--duration,4s) ease calc(var(--i, 0)*.4s) infinite",
            },
            keyframes: {
                grid: {
                    "0%": { transform: "translateY(-50%)" },
                    "100%": { transform: "translateY(0)" },
                },
                ripple: {
                    "0%, 100%": {
                        transform: "translate(-50%, -50%) scale(1)",
                    },
                    "50%": {
                        transform: "translate(-50%, -50%) scale(0.75)",
                    },
                },
            },
        },
    },
    plugins: [
        heroui({
            prefix: 'vra',
            addCommonColors: false,
            defaultTheme: 'dark',
            defaultExtendTheme: 'dark',
            layout: {},
            themes: {
                light: {
                    layout: {},
                    colors: {},
                },
                dark: {
                    layout: {},
                    colors: {},
                },
            },
        }),
    ],
}

