/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                'zen-dots': ['Zen Dots', 'sans'],
                'sans-tc': ['Noto Sans TC', 'sans'],
            },
            colors: {
                mainBlue: '#6689CB',
            },
        },
    },
    plugins: [],
}
