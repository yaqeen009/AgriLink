
 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js}"],
   theme: {
     extend: {
        colors: {               //color scheme
        primary: "#0A400C", 
        accent: "#B1AB86",
        secondary: "#819067",
        background: "#FEFAE0",
      },
      fontFamily:{
        montserrat:['Montserrat', 'sans-serif'],
        open_sans:['Open Sans','sans-serif'],
      },
      fontSize:{
        'display':'48px',
        'headline1':'36px',
        'headline2':'24px',
        'body':'20px',
        'cta':'16px',
        'label':'14px',
      },
      screens:{
        'sm':{'max': '640px'},
        'md':{'min':'641px','max': '1024px'},
        'lg':{'min':'1025px'}
      },
     },
   },
   plugins: [],
 }