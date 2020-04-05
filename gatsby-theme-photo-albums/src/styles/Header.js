/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const Header = ({children}) => 
  <div sx={{variant: 'layout.header'}}>
    {children}
  </div>

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Header