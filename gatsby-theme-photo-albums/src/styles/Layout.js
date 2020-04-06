/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const Layout = ({children}) => 
  <div sx={{variant: 'layout.root'}}>
    {children}
  </div>

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Layout