import compose from 'ramda/src/compose'
import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout/Layout'
import {pathToFileTitle, removePathPrefix, removeFileExtension} from '../util/url-text'
import useWindowDimensions from '../hooks/use-window-dimensions'
import photoDimensions from '../util/photo-dimensions'

const Photo =  ({data, path, pageContext}) => {
  
  const pathPrefix = data.site.pathPrefix
  path = compose(
    removeFileExtension, removePathPrefix(pathPrefix), decodeURI
  )(path)
  const title = pathToFileTitle(path)
  const ref = useRef(null)
  const windowDimensions = useWindowDimensions()
  const dimensions = photoDimensions(windowDimensions, pageContext)
console.log('window', windowDimensions, 'dim', dimensions)
  return (
    <Layout path={path}>
      <div className='photo-page' data-testid={path} ref={ref}>
        <Img fixed={data.photo.childImageSharp.fixed} alt={title} title={title}
          loading='eager' css={dimensions}/>
      </div>
    </Layout>
  )
}

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
  }),
  pageContext: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired
}

export default Photo