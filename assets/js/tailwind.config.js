/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html', 
    './pages/**/*.html', 
    './assets/js/**/*.js' // Adjust paths based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6C00', // Custom primary color
        secondary: '#4B5563', // Custom secondary color
      },
      spacing: {
        '100': '25rem',
        '112': '28rem',
        '450': '450px', // Adds spacing utility for 450px
      },
      boxShadow: {
        'custom-light': '0 2px 4px rgba(0, 0, 0, 0.1)', // Light shadow
        'custom-dark': '0 4px 8px rgba(0, 0, 0, 0.3)', // Dark shadow
      },
      borderWidth: {
        '2': '2px', // Border width utility for 2px
      },
    },
  },
  plugins: [],
};
