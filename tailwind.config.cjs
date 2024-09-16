const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ["./index.html", './src/**/*.{js,jsx,ts,tsx}', "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",],
    theme: {
        extend: {
            colors: {
                primary: '#601EF9',
            },
            // borderRadius: {
            //     large: "24px",
            // }
        },
    },
    plugins: [
        nextui({
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

