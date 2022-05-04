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
        'cyanbg': '#006484',
        'purplebg': '#6A0A56',
        'white': '#ffffff',
        'redbg': '#7C7070',
      },
      gridTemplateRows: {
        '22': 'repeat(22, minmax(0, 1fr))',
      }
    }
  },
  plugins: [],
}