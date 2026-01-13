/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    bg: "#020617", // Slate 950 - Deep dark background
                    primary: "#10b981", // Emerald 500 - Vibrant green (CM Globals branding)
                    secondary: "#1e293b", // Slate 800 - Secondary surface
                    muted: "#94a3b8", // Slate 400 - Muted text
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { opacity: 1, boxShadow: '0 0 10px #10b981' },
                    '50%': { opacity: .5, boxShadow: '0 0 20px #10b981' },
                },
            },
        },
    },
    plugins: [],
}
