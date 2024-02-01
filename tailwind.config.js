/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        info: '#0492de',
        success: '#1ea431',
        error: '#db221a',
        warning: '#d67813',
        'light-info': '#daebfa',
        'light-success': '#e1fada',
        'light-error': '#f8e0d1',
        'light-warning': '#fef2cb'
      }
    }
  },
  plugins: []
}
