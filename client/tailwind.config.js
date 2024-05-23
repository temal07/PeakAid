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
      },
      maxHeight: {
        '80': '20rem'
      },
      maxWidth: {
        '80': '20rem'
      },

      animation: {
				fade: 'fadeIn .5s ease-in-out',
			},

			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
    },
  },
  plugins: [flowbite.plugin(), require('tailwind-scrollbar')],
}
