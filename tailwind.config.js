module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  safelist: [
    'border',
    'border-gray-300',
    'flex',
    'flex-1',
    'border-none',
    'rounded-none',
    'focus:ring-0',
    'focus:border-none',
    'bg-transparent',
    'hover:bg-transparent',
    'hover:bg-gray-700',
    'transition-colors',
    'duration-200',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' }, 
          '100%': { opacity: '1' }, 
        },
        fadeOut: {
          '0%': { opacity: '1' }, 
          '100%': { opacity: '0' }, 
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        fadeOut: 'fadeOut 0.3s ease-out',
      },
    },
  },
  plugins: [],
};


