/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef6ee",
          100: "#fdead6",
          200: "#fad2ad",
          300: "#f7b279",
          400: "#f38843",
          500: "#f0681e",
          600: "#e14d14",
          700: "#ba3812",
          800: "#942e16",
          900: "#782815",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
