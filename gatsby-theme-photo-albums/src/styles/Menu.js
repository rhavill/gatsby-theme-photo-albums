/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const Menu = ({children}) => 
  <nav sx={{variant: 'layout.header.menu'}}>
    {children}
  </nav>

Menu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
}

export default Menu