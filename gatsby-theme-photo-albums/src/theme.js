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
      }
    },
    Header: {
      backgroundColor: 'primary',
      color: 'secondary',
      fontWeight: 'bold',
      position: 'fixed',
      width: '100%',
      zIndex: 2,
      nav: {
        padding: '1rem',
        maxWidth: [640, 768, 1024, 1200, 1366, '100%'],
        a: {
          '::before': {
            content: '"\\00A0/\\00A0"'
          },
          ':first-child': {
            '::before': {
              content: 'none'
            }
          }
        }
      },
    },
    Main: {
      maxWidth: [640, 768, 1024, 1200, 1366, '100%'],
      top: '4.1rem',
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
      },
      '.photo-page': {
        maxWidth: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '4rem'
      }
    },
  }
}

export default theme