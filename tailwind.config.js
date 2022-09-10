module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      animation: {
        'blink': 'blinker 1s linear infinite',
      },
      keyframes: {
        blinker: {
          '50%': { opacity: 0 }
        }
      },
      colors: {
        // Configure color palette here
        'magenta': '#ec4899',
        'cyan': '#37E5DB',
        'purple': '#9C58EF',
        'greybg': '#303030',
        'grey-txt': '#666666',
        'cyanbg': '#006484',
        'purplebg': '#6A0A56',
        'white': '#ffffff',
        'redbg': '#562425',
        'bordergrid': '#562425',
      },
      gridTemplateRows: {
        '22': 'repeat(22, minmax(0, 1fr))',
      },
      backgroundImage: {
        'gradient-yellow': "linear-gradient(140deg, rgba(248,243,140,1) 0%, rgba(255,220,0,1) 100%)",
        'gradient-orange': "linear-gradient(140deg, rgba(246,145,79,1) 0%, rgba(230,109,36,1) 100%)",
        'gradient-purple': "linear-gradient(140deg, rgba(211,109,171,1) 0%, rgba(174,36,143,1) 100%)",
        'gradient-blue': "linear-gradient(140deg, rgba(39,193,242,1) 0%, rgba(0,152,221,1) 100%)",
        'gradient-red': "linear-gradient(140deg, rgba(243,121,92,1) 0%, rgba(212,33,41,1) 100%)",
        'gradient-grey': "linear-gradient(140deg, rgba(143,127,127,1) 0%, rgba(71,55,55,1) 100%)",
      },
      dropShadow: {
        'md-black': '0.2rem 0.2rem 0.15rem rgba(0, 0, 0, 0.6)',
      },
    }
  },
  plugins: [],
}