/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'csarda': {
          'barna': {
            'sotet': '#6B3E26',    // Sötét dió
            'vilagos': '#B99A78',  // Fakó tölgy
            'kozep': '#8C6046'     // Égetett barna
          },
          'feher': {
            'alap': '#FFF8F0',     // Vajfehér
            'tort': '#F7F3EA'      // Törtfehér
          },
          'piros': {
            'mely': '#A0241C',     // Mély magyar piros
            'vilagos': '#D0403A'   // Világosabb piros
          },
          'zold': {
            'palack': '#50714B',   // Palackzöld
            'kakukkfu': '#7E9872'  // Kakukkfű zöld
          },
          'sarga': {
            'szalma': '#FFD75F',   // Szalmasárga
            'vilagos': '#FFEEB2'   // Világos sárga
          }
        }
      },
      fontFamily: {
        'bree': ['Bree Serif', 'serif'],
        'lora': ['Lora', 'serif'],
        'nunito': ['Nunito Sans', 'sans-serif']
      },
      borderWidth: {
        '3': '3px'
      },
      backgroundImage: {
        'csarda-pattern': "url('/src/assets/csarda-pattern.svg')",
        'fa-pattern': "url('/src/assets/fa-pattern.svg')"
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) translateX(-50%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) translateX(-50%)'
          },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards'
      }
    },
  },
  plugins: [],
} 