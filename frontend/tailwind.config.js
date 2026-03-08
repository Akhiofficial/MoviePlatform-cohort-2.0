/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                'brand-red': '#E50914',
                'bg-dark': '#0f0f0f',
                'card-dark': '#1a1a1a',
            },
        },
    },
    plugins: [],
}
