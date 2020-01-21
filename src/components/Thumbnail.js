import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import Img from 'gatsby-image'
import {pathToFileTitle} from '../util/url-text'

const Thumbnail = ({path, imageData}) => {
  const title = pathToFileTitle(path)
  return <article className='file' data-testid='file'>
    <Link to={path}>
      <Img fixed={imageData} alt={title} title={title}/>
    </Link>
  </article>
}

Thumbnail.propTypes = {
  path: PropTypes.string.isRequired,
  imageData: PropTypes.shape({
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired  
}

export default Thumbnail