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
      colors: {
        // Configure your color palette here
        'magenta': '#ec4899',
        'cyan': '#37E5DB',
        'purple': '#9C58EF',
        'greybg': '#303030',
        'grey-txt': '#666666',
        'cyanbg': '#006484',
        'purplebg': '#6A0A56',
        'white': '#ffffff',
        'redbg': '#792c2c',
      },
      gridTemplateRows: {
        '22': 'repeat(22, minmax(0, 1fr))',
      },
      backgroundImage: {
        's-yellow': "linear-gradient(140deg, rgba(248,243,140,1) 0%, rgba(255,220,0,1) 100%)",
        't-orange': "linear-gradient(140deg, rgba(246,145,79,1) 0%, rgba(230,109,36,1) 100%)",
        'o-purple': "linear-gradient(140deg, rgba(211,109,171,1) 0%, rgba(174,36,143,1) 100%)",
        'l-blue': "linear-gradient(140deg, rgba(39,193,242,1) 0%, rgba(0,152,221,1) 100%)",
        'i-red': "linear-gradient(140deg, rgba(243,121,92,1) 0%, rgba(212,33,41,1) 100%)",
      },
    }
  },
  plugins: [],
}