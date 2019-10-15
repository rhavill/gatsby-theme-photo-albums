import React from "react"
import PropTypes from "prop-types"
import {graphql, Link} from "gatsby"
import Img from "gatsby-image"

const Thumbnail = ({fileData}) =>  
  <article className='file'>
    <Link to={fileData.fsPath}>
      <Img fixed={fileData.fixed} />
    </Link>
  </article>
  
export const query = graphql`
  fragment ThumbnailFragment on FileConnection {
    edges {
      node {
        relativePath
        childImageSharp {
          fixed(width: 250, height: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`

Thumbnail.propTypes = {
  fileData: PropTypes.shape({
    fsPath: PropTypes.string.isRequired,
    fixed: PropTypes.shape({
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired
  }).isRequired  
}

export default Thumbnail