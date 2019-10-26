import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import {gatsbyPathnameToChildComponentPath, pathToFileTitle} 
  from '../util/text-utils'

const Photo =  ({data, path}) => {
  path = gatsbyPathnameToChildComponentPath(path, data)
  const title = pathToFileTitle(path)

  return (
    <Layout path={path}>
      <div className='photo-page' data-testid={path}>
        <Img fluid={data.photo.childImageSharp.fluid}  alt={title} title={title} />
      </div>
    </Layout>
  )
}
// set "fit" property to CONTAIN or COVER?
export const query = graphql`
  query photoQuery($relativePath: String!) {
    photo: file(relativePath: {eq: $relativePath}) {
      childImageSharp {
        fluid(maxWidth: 1093, srcSetBreakpoints: [512, 614, 819, 1093], fit: COVER) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      pathPrefix
    }
  }
`

Photo.propTypes = {
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    relativePath: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    photo: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({
          src: PropTypes.string.isRequired,
          srcSet: PropTypes.string.isRequired,
        })
      })
    })
  })
}

export default Photo