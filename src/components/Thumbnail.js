import React from 'react'
import PropTypes from 'prop-types'
import {graphql, Link} from 'gatsby'
import Img from 'gatsby-image'
import {pathToFileTitle} from '../util/text-utils'

const Thumbnail = ({path, imageData}) => {
  const title = pathToFileTitle(path)
  return <article className='file' data-testid='file'>
    <Link to={path}>
      <Img fixed={imageData.childImageSharp.fixed} alt={title} title={title}/>
    </Link>
  </article>
}

Thumbnail.propTypes = {
  path: PropTypes.string.isRequired,
  imageData: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fixed: PropTypes.shape({
        src: PropTypes.string.isRequired,
        srcSet: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }).isRequired
    }).isRequired
  }).isRequired  
}

export default Thumbnail