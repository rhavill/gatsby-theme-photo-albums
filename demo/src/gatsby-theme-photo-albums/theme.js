import merge from 'lodash.merge'
import baseTheme from 'gatsby-theme-photo-albums/src/theme'

export const theme = merge({}, baseTheme, {
  colors: {
    text: '#fff',
    background: '#4f4f4f',
    primary: '#3c3c3c',
    secondary: '#9e9e9e',
  },
  styles: {
    Main: {
      '.folder': {
        color: 'secondary'
      }
    }
  }
})

export default theme