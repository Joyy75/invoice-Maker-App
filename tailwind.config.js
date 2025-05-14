/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../node_modules/flowbite",
  ],
  theme: {
    container : {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "14rem",
      }
    },
    fontFamily : {
    sans: ["Montserrat","Padauk","sans-serif"],
  },
    extend: {},
  },
  plugins: ["flowbite/plugin"],
}

