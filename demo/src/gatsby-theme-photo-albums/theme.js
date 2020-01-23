import merge from 'lodash.merge'
import baseTheme from 'gatsby-theme-photo-albums/src/theme'

export const theme = merge({}, baseTheme, {
  colors: {
    background: '#eee',
  },
})

export default theme