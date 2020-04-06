export const theme = {
  breakpoints: ['640px', '768px', '1024px', '1200px', '1366px'],
  fonts: {
    body: 'PT Sans, -apple-system, BlinkMacSystemFont, Segoe UI ,Roboto, Helvetica Neue, Arial, sans-serif',
  },
  fontSizes: [16, 20, 25, 30],
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#6bccf9',
    secondary: '#000',
    accent: '#fff',
    muted: '#f6f6f6f',
    modes: {
      dark: {
        text: '#fff',
        background: '#4f4f4f',
        primary: '#3c3c3c',
        secondary: '#9e9e9e',
        accent: '#fff',
        muted: '#f6f6f6f',
      }
    }
  },
  space: [0, '.25rem', '.5rem', '.75rem', '1rem', '2rem', '3rem'],
  zIndices: [100, 200],
  layout: {
    root: {
      position: 'relative',
      margin: 0
    },
    header: {
      color: 'secondary',
      fontWeight: 'bold',
      position: 'fixed',
      top: 0,
      zIndex: 1,
      menu: {
        backgroundColor: 'primary',
        ul: {
          listStyleType: 'none',
          margin: 0,
          padding: 0,
        },
        li: {
          display: 'block',
          padding: '.5rem',
          borderTop: '1px solid',
        },
        label: {
          fontSize: 3,
          width: '3rem',
          height: '3rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        },
        input: {
          display: 'none'
        }
      },
    },
    main: {
      maxWidth: [640, 768, 1024, 1200, 1366, '100%'],
      position: 'relative',
    },
    pager: {
      margin: 4,
      textAlign: 'center',
      a: {
        padding: 3,
        textDecoration: 'none',
        ':hover': {
          color: 'text',
          textDecoration: 'underline',
        }
      }
    },
  },
  indexPage: {
    margin: 3,
    // display: 'flex',
    // flexWrap: 'wrap',
    '.folder': {
      a: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 1,
        position: 'relative',
        '.folder-title': {
          position: 'absolute'
        }
      }
    },
  },
  photoPage: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 3,
    color: 'secondary',
    '.photo-navigation': {
      backgroundColor: 'primary',
      width: '3.0rem',
      height: '3.0rem',
      display: 'flex',
      '@media (max-width: 680px)': {
        display: 'none',
      },
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 0,
      opacity: '40%',
    },
    '.previous': {
      left: 0,
    },
    '.next': {
      right: 0,
    },
    '.parent': {
      right: 0,
      top: 0,
      display: 'none',
    },
  },
  styles: {
    root: {
      backgroundColor: 'background',
      color: 'text',
      fontFamily: 'body',
      fontSize: 0,
      margin: 0,
      a: {
        color: 'inherit',
        textDecoration: 'none',
        ':hover': {
          color: 'accent',
        }
      },
      section: {
        flexGrow: 1,
        justifyContent: 'center',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 250px)',
        gridTemplateRows: 'repeat(auto-fill, 250px)',
        gridGap: 3,
      },
      '.gatsby-image-wrapper':  {
        borderRadius: '.5rem',
        boxShadow: '0.25rem 0.25rem .5rem .1rem #000',
        margin: 'auto',
      },
    },
  }
}

export default theme