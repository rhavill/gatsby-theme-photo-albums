import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import compose from 'ramda/src/compose'
import {pathToFileTitle, removePathPrefix} from '../util/url-text'

const Photo =  ({data, path}) => {
  const pathPrefix = data.site.pathPrefix
  path = compose(removePathPrefix(pathPrefix), decodeURI)(path)
  const title = pathToFileTitle(path)

  return (
    <Layout path={path}>
      <div className='photo-page' data-testid={path}>
        <Img fluid={data.photo.childImageSharp.fluid}  alt={title} title={title}
          loading='eager' />
      </div>
    </Layout>
  )
}
// set "fit" property to CONTAIN or COVER?
// add maxWidth values for 1280 and 1536?
export const query = graphql`
  query photoQuery($relativePath: String!) {
    site {
      pathPrefix
    }
    photo: file(relativePath: {eq: $relativePath}) {
      childImageSharp {
        fluid(maxWidth: 1024, srcSetBreakpoints: [512, 614, 819, 1024], fit: CONTAIN) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

Photo.propTypes = {
  path: PropTypes.string.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      pathPrefix: PropTypes.string.isRequired,
    }),
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