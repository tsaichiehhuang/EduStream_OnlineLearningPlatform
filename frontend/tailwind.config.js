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
                        background: '#FFFFFF', // or DEFAULT
                        foreground: '#11181C', // or 50 to 900 DEFAULT
                        primary: {
                            //... 50 to 900
                            foreground: '#FFFFFF',
                            DEFAULT: '#006FEE',
                        },
                    }, // light theme colors
                },
                dark: {
                    layout: {}, // dark theme layout tokens
                    colors: {
                        background: '#000000', // or DEFAULT
                        foreground: '#ECEDEE', // or 50 to 900 DEFAULT
                        primary: {
                            //... 50 to 900
                            foreground: '#FFFFFF',
                            DEFAULT: '#006FEE',
                        },
                    }, // dark theme colors
                },
                mytheme: {
                    // custom theme
                    extend: 'dark',
                    colors: {
                        primary: {
                            DEFAULT: '#BEF264',
                            foreground: '#000000',
                        },
                        focus: '#BEF264',
                    },
                },
            },
        }),
    ],
}
