import React from "react"
import PropTypes from "prop-types"
import {graphql, Link} from "gatsby"
import Img from "gatsby-image"
import toTitleCase from '../util/to-title-case'

const Thumbnail = ({path, imageData}) => {
  const title = toTitleCase(path.replace(/.*\/([^/]+)$/, '$1').replace(/\.[^/.]+$/, ''))
  return <article className='file' data-testid='file'>
    <Link to={path}>
      <Img fixed={imageData.childImageSharp.fixed}  alt={title}/>
    </Link>
  </article>
}

export const query = graphql`
  fragment ThumbnailFragment on File {
    childImageSharp {
      fixed(width: 250, height: 250) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

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