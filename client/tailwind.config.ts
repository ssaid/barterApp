/** @type {import('tailwindcss').Config} */

import { nextui } from '@nextui-org/react';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      // themes: {
      //   dark: {
      //     colors: {
      //       primary: {
      //         DEFAULT: "#17C964",
      //         foreground: "#000000",
      //       },
      //     },
      //   },
      //   light: {
      //     colors: {
      //       primary: {
      //         DEFAULT: "#17C964",
      //         foreground: "#FFF",
      //       },
      //     },

      //   }
      // }
    })
  ],
}
