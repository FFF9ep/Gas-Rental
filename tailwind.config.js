/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1615FF',
        soft: '#F5F7FF',
        subtle: '#E9EEF9'
      },
      boxShadow: {
        subtle: '0 6px 18px rgba(22,21,255,0.06)'
      },
      borderRadius: {
        lg2: '12px'
      }
    }
  },
  plugins: []
}
