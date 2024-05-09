const flowbite = require('flowbite-react/tailwind');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        'radio-canada-big': ['Radio Canada Big', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [flowbite.plugin()],
}
