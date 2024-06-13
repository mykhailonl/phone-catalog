import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-primary': '#313237',
        secondary: '#89939A',
        icons: '#B4BDC3',
        elements: '#E2E6E9',
        'hover-bg': '#FAFBFC',
        white: '#FFFFFF',
        green: '#27AE60',
        red: '#EB5757',
      },
      fontFamily: {
        mont: ['Mont', 'sans-serif'],
      },
      screens: {
        sm: '320px',
        md: '640px',
        lg: '1200px',
      },
      typography: (theme) => ({
        DEFAULT: {
          // def styles(mobile),
          // to use add className='prose' + optional sizes 'md:prose-md'
          css: {
            // def text color and font when using 'prose' class
            color: theme('colors.gray-primary'),
            fontFamily: theme('fontFamily.mont').join(', '),
            h1: {
              fontSize: '32px',
              lineHeight: '41px',
              letterSpacing: '-0.01em',
              fontWeight: '700',
            },
            h2: {
              fontSize: '22px',
              lineHeight: '31px',
              letterSpacing: '0',
              fontWeight: '700',
            },
            h3: {
              fontSize: '20px',
              lineHeight: '26px',
              letterSpacing: '0',
              fontWeight: '600',
            },
            h4: {
              fontSize: '16px',
              lineHeight: '20px',
              letterSpacing: '0',
              fontWeight: '600',
            },
            p: {
              fontSize: '14px',
              lineHeight: '21px',
              letterSpacing: '0',
              fontWeight: '400',
            },
            small: {
              fontSize: '12px',
              lineHeight: '15px',
              letterSpacing: '0',
              fontWeight: '600',
            },
            button: {
              fontSize: '14px',
              lineHeight: '21px',
              letterSpacing: '0',
              fontWeight: '600',
            },
            uppercase: {
              fontSize: '12px',
              lineHeight: '11px',
              letterSpacing: '0.04em',
              fontWeight: '700',
              textTransform: 'uppercase',
            },
          },
        },
        // text styles tablet+ (640px+)
        md: {
          css: {
            h1: {
              fontSize: '48px',
              lineHeight: '56px',
              letterSpacing: '-0.01em',
              fontWeight: '700',
            },
            h2: {
              fontSize: '32px',
              lineHeight: '41px',
              letterSpacing: '-0.01em',
              fontWeight: '700',
            },
            h3: {
              fontSize: '22px',
              lineHeight: '31px',
              letterSpacing: '0',
              fontWeight: '700',
            },
            h4: {
              fontSize: '20px',
              lineHeight: '26px',
              letterSpacing: '0',
              fontWeight: '600',
            },
            p: {
              fontSize: '14px',
              lineHeight: '21px',
              letterSpacing: '0',
              fontWeight: '400',
            },
            small: {
              fontSize: '12px',
              lineHeight: '15px',
              letterSpacing: '0',
              fontWeight: '600',
            },
            button: {
              fontSize: '14px',
              lineHeight: '21px',
              letterSpacing: '0',
              fontWeight: '600',
            },
            uppercase: {
              fontSize: '12px',
              lineHeight: '11px',
              letterSpacing: '0.04em',
              fontWeight: '700',
              textTransform: 'uppercase',
            },
          },
        },
      }),
      gridTemplateColumns: {
        mobile: 'repeat(4, minmax(0, 1fr))',
        tablet: 'repeat(12, minmax(0, 1fr))',
        desktop: 'repeat(24, 32px)',
        // TODO desktop+?
      },
      gap: {
        '16px': '1rem',
      },
      padding: {
        content: '16px',
        'content-md': '24px',
        'content-lg': '32px',
      },
    },
  },
  plugins: [typography],
};
