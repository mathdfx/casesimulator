// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        reveal: {
          '0%': { transform: 'scale(1.05)', boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.3)' },
          '50%': { transform: 'scale(1.15)', boxShadow: '0 0 30px 10px rgba(255, 255, 255, 0.5)' },
          '100%': { transform: 'scale(1.1)', boxShadow: '0 0 20px 7px rgba(255, 255, 255, 0.4)' },
        }
      },
      animation: {
        reveal: 'reveal 1.5s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}