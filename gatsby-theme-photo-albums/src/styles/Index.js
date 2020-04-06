/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const Index = ({children}) => 
  <div sx={{variant: 'indexPage'}}>
    {children}
  </div>

Index.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Index