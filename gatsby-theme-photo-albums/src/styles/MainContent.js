/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const MainContent = ({children}) => 
  <div sx={{variant: 'layout.main'}}>
    {children}
  </div>

MainContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default MainContent