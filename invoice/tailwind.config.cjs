/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sansSerif: ['Source Sans Pro', 'sans - serif'],
      mono: ['Source Code Pro', 'monospace'],
      handWriting: ['Kalam', 'cursive']
    },
    extend: {
      backgroundImage: {
        arrowRightUp: "url('images/arrow-right-up.svg')",
        arrowLeftUp: "url('images/arrow-left-up.svg')",
        chevronDown: "url('images/chevron--down.svg')",
        circle: "url('images/circle.svg')"
      },

      backgroundPosition: {
        'right-center': '97% center'
      },
      borderWidth: {
        1: '1px'
      },
      boxShadow: {
        colored: '0px 7px 16px rgba(127,91,220,0,002)',
        coloredHover: '0px 16px 25px rgba(127,91,220,0.3)',
        slidePanel: '-4px 0px 44px rgba(0,0,0,0.25',
        tableRow: '0px 0px 6px rgba(0,0,0,0.16)'
      },
      colors: {
        blueGem: '#3813a0',
        caribbeanGreen: '#00ca9e',
        caribbeanGreen: '#1CC6A0',
        daisyBush: '#4714a5',
        fog: '#decaec',
        gallery: '#efeaf2',
        goldenFizz: '#f3ff40',
        lavenderIndigo: '#8657e1',
        monsoon: '#777878',
        pastelPurple: '#b2a1bb',
        prim: '#ede6ef',
        purple: '#7209b7',
        robinEggBlue: '#00e9c0',
        scarlet: '#f72f45',
        silver: '#c0c0c0',
        whisper: '#f9f4f9'
      },
      gridTemplateColumns: {
        invoiceTable: '100px 100px 60px 1fr 116px 32px 32px',
        invoiceTableMobile: '1fr 90px'
      },
      zIndex: {
        modal: 999,
        slidePanel: 998,
        overlay: 997,
        navBarToggle: 91,
        navBar: 90
      }
    }
  },
  plugins: []
};
