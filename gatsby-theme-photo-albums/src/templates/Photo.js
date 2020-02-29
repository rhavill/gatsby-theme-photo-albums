import compose from 'ramda/src/compose'
import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout/Layout'
import {pathToFileTitle, removePathPrefix, removeFileExtension} from '../util/url-text'

const Photo =  ({data, path}) => {
  const pathPrefix = data.site.pathPrefix
  path = compose(
    removeFileExtension, removePathPrefix(pathPrefix), decodeURI
  )(path)
  const title = pathToFileTitle(path)

  return (
    <Layout path={path}>
      <div className='photo-page' data-testid={path}>
        <Img fixed={data.photo.childImageSharp.fixed} alt={title} title={title}
          loading='eager' />
      </div>
    </Layout>
  )
}
// set "fit" property to CONTAIN or COVER?
// add maxWidth values for 1280 and 1536?
export const query = graphql`
  query photoQuery($relativePath: String!, $width: Int!, $height: Int!) {
    site {
      pathPrefix
    }
    photo: file(relativePath: {eq: $relativePath}) {
      childImageSharp {
        fixed(width: $width, height: $height) {
          ...GatsbyImageSharpFixed
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
        fixed: PropTypes.shape({
          src: PropTypes.string.isRequired,
          srcSet: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
        }).isRequired
      })
    })
  })
}

export default Photo