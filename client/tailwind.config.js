/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens:{
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontSize:{
      Dnav: '1.344rem',
      Hero:'5.281rem',
      '13': '13px',
      '14':'14px',
      '18': '18px',
      '20': '1.25rem',
      '55': '3.5rem',
      '24': '1.531rem',
      '36': '2.281rem',
      '31': '31px',
      '26': '26px',
    },
    extend: {
      fontFamily:{
        pop:['Poppins'],
      },
      colors:{
        white:'#FFFFFF',
        semiWhite: '#FDFDFD',
        lightblue: 'rgba(67, 215, 255, 0.2)',
        Turqoise: '#1ACCFC',
        superLgrey:'rgba(230, 230, 233, 1)',
        greyL:'#6E6C6C',
        greyD: '#E6E6E9',
        black:'#010101',
        line: 'rgba(26, 26, 26, 1)',
        dashboardGrey: 'rgba(36, 38, 39, 1)',
        red:'#ff1616',
      },
      height:{
        '248':'248px',
        '685':'42.8rem',
        '600': '37.5rem',
        '1300': '1300px',
        '185':'185px',

      },
      width:{
        '30':'30%',
        '45':'45%',
        '49':'49%',
        '55':'55%',
        '280': '282px',
        '95': '95%',
      },
      lineHeight:{
        '90': '4.5rem',
        '20': '1.30rem',
        '55': '3.1rem',
        '24': '1.4rem',
        '36': '2.1rem',
        '32': '32px',
        '26': '26px',
      },
      spacing: {
        '78': '335px',
        '22': '5.3rem',
      },
      boxShadow: {
        'custom-inner': 'inset 3.45px 3.45px 7.6px 0 rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}

