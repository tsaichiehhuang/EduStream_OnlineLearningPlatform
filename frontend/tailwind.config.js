/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'zen-dots': ['Zen Dots', 'sans'],
                'sans-tc': ['Noto Sans TC', 'sans'],
            },
            colors: {
                mainBlue: '#6689CB',
                mainGreen: '#5FCC7D ',
                mainOrange: '#F2A660 ',
                darkGray: '#B0B0B0',
            },
            minHeight: {
                56: '14rem',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            prefix: 'nextui', // prefix for themes variables
            addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
            defaultTheme: 'light', // default theme from the themes object
            defaultExtendTheme: 'light', // default theme to extend on custom themes
            layout: {}, // common layout tokens (applied to all themes)
            themes: {
                light: {
                    layout: {}, // light theme layout tokens
                    colors: {
                        background: '#FDFDFD',
                        foreground: '#11181C',
                        primary: {
                            foreground: '#FFFFFF',
                            DEFAULT: '#6689CB',
                        },
                        success: '#7FE69C',
                        bordered: '#333',
                        warning: { DEFAULT: '#F2A660', foreground: '#000000' },
                    },
                },
                dark: {
                    layout: {},
                    colors: {
                        background: '#171E28',
                        foreground: '#ECEDEE',
                        primary: {
                            foreground: '#FFFFFF',
                            DEFAULT: '#6689CB',
                        },
                    },
                },
            },
        }),
    ],
}
