import React from 'react'
import PropTypes from 'prop-types'
import {graphql, Link} from 'gatsby'
import Img from 'gatsby-image'
import {pathToFileTitle} from '../util/text-utils'

const Folder = ({path, imageData}) => {
  const title = pathToFileTitle(path)
  return (
    <article className='folder' data-testid='folder'>
      <Link to={path}>
        <Img fixed={imageData.childImageSharp.fixed} alt={title} title={title} />
        <div className='folder-title'>{title}</div>
      </Link>
    </article>
  )
}

export const query = graphql`
  fragment FolderFragment on File {
    childImageSharp {
      fixed(width: 250, height: 250) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

Folder.propTypes = {
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

export default Folder