export const theme = {
  breakpoints: ['640px', '768px', '1024px', '1200px', '1366px'],
  fonts: {
    body: 'PT Sans, -apple-system, BlinkMacSystemFont, Segoe UI ,Roboto, Helvetica Neue, Arial, sans-serif',
  },
  fontSizes: [16, 20],
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
  styles: {
    Layout: {
      backgroundColor: 'background',
      color: 'text',
      fontFamily: 'body',
      fontSize: 0,
      position: 'relative',
      a: {
        color: 'inherit',
        textDecoration: 'none',
        ':hover': {
          color: 'accent',
        }
      },
      '.listing-page': {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '.75rem'
      }
    },
    Header: {
      color: 'secondary',
      fontWeight: 'bold',
      position: 'fixed',
      zIndex: 200,
    },
    Main: {
      maxWidth: [640, 768, 1024, 1200, 1366, '100%'],
      position: 'relative',
      section: {
        flexGrow: 1,
        justifyContent: 'center',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 250px)',
        gridTemplateRows: 'repeat(auto-fill, 250px)',
        gridGap: '1rem'
      },
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
      '.pager': {
        margin: '1rem',
        textAlign: 'center',
        a: {
          padding: '.75rem',
          textDecoration: 'none',
          ':hover': {
            color: 'text',
            textDecoration: 'underline',
          }
        }
      },
      '.gatsby-image-wrapper':  {
        borderRadius: '.5rem',
        boxShadow: '0.25rem 0.25rem .5rem .1rem #000',
        margin: 'auto',
      },
      '.photo-page': {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '2rem',
        color: 'secondary',
        '.photo-navigation': {
          backgroundColor: 'primary',
          width: '3.0rem',
          height: '3.0rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 200,
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
        },
      }
    },
  }
}

export default theme