import compose from 'ramda/src/compose'
import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import {Global} from '@emotion/core'
import {graphql, Link} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout/Layout'
import {pathToFileTitle, removePathPrefix, removeFileExtension} from '../util/url-text'
import useWindowDimensions from '../hooks/use-window-dimensions'
import photoDimensions from '../util/photo-dimensions'
//import { Context } from 'theme-ui'

const Photo =  ({data, path, pageContext}) => {
  const pathPrefix = data.site.pathPrefix
  path = compose(
    removeFileExtension, removePathPrefix(pathPrefix), decodeURI
  )(path)
  const title = pathToFileTitle(path)
  const ref = useRef(null)
  const windowDimensions = useWindowDimensions()
  const dimensions = photoDimensions(windowDimensions, pageContext)

  return (
    <Layout path={path}>
      <Global
        styles={{
          'body': {
            margin: 0
          }
        }}
      />
      <div className='photo-page' data-testid={path} ref={ref}>
        {pageContext.file.previousUrl ?
          <div className='photo-navigation previous'>
            <div><Link to={pageContext.file.previousUrl}>◄</Link></div>
          </div> 
          : null}
        <Img fixed={data.photo.childImageSharp.fixed} alt={title} title={title}
          loading='eager' css={dimensions}/>
        {pageContext.file.parentUrl ?
          <div className='photo-navigation parent'>
            <div><Link to={pageContext.file.parentUrl}>⯅</Link></div>
          </div>
          : null}
        {pageContext.file.nextUrl ?
          <div className='photo-navigation next'>
            <div><Link to={pageContext.file.nextUrl}>►</Link></div>
          </div>
          : null}
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
    file: PropTypes.shape({
      previousUrl: PropTypes.string.isRequired,
      nextUrl: PropTypes.string.isRequired,
      parentUrl: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
}

export default Photo