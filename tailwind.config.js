/** @type {import('tailwindcss').Config} */
export const content = [
  "./views/**/*.{ejs,js}",
  "./public/js/*.js"
];
export const theme = {
  extend: {
    colors: {
      primary: '#d5b263',
      secondary: '#293040'
    },
    fontFamily: {
      body: ['Roboto', 'sans-serif'],
      heading: ['Merriweather', 'serif'],
    },
  },
};
export const plugins = [];