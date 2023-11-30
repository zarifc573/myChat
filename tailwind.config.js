/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary':'#5F35F5'
      },
      boxShadow: {
        'custom': '-2px 0px 4px 0px rgba(0, 0, 0, 0.25)',
        'custom2': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      dropShadow: {
        'drop': '5px 5px 10px rgba(0, 0, 0, 0.25)',
      }
     

    },
  },
  plugins: [],
}