/** @type {import('tailwindcss').Config} */

// const nativewind = require("nativewind/tailwind/css");

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        laptop: "1024px",
      },
    },
  },
  // plugins: [nativewind],
  important: "html",
};
