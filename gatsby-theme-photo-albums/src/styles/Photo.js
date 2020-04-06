/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const Photo = ({children, height}) => 
  <div sx={{variant: 'photoPage', height}}>
    {children}
  </div>

Photo.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  height: PropTypes.number.isRequired,
}

export default Photo