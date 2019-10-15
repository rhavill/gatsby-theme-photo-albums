import React from "react"
import PropTypes from "prop-types"
import {graphql, Link} from "gatsby"
import Img from "gatsby-image"
import toTitleCase from '../util/to-title-case'

const Folder = ({path, fixedImageData}) => {
  const title = toTitleCase(path.replace(/.*\/([^/]+)$/, '$1'))
  return (
    <article className='folder'>
      <Link to={path}>
        <Img fixed={fixedImageData.childImageSharp.fixed} alt={title} />
        <div className="folder-title">{title}</div>
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
  fixedImageData: PropTypes.shape({
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