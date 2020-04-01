import both from 'ramda/src/both'
import compose from 'ramda/src/compose'
import find from 'ramda/src/find'
import prop from 'ramda/src/prop'
import propEq from 'ramda/src/propEq'
import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import {Global} from '@emotion/core'
import {graphql, navigate, Link} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout/Layout'
import {isNotNil} from '../util/ramda-utils'
import {pathToFileTitle, removePathPrefix, removeFileExtension} from '../util/url-text'
import useKeyUp from '../hooks/use-key-up'
import useSwipeNavigate from '../hooks/use-swipe-navigate'
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

  const previousUrl = pageContext.file.previousUrl
  const nextUrl = pageContext.file.nextUrl
  const parentUrl = pageContext.file.parentUrl
  const keyUpActions = [
    {navigateTo: parentUrl, wasPressed: useKeyUp('ArrowUp')},
    {navigateTo: previousUrl, wasPressed: useKeyUp('ArrowLeft')},
    {navigateTo: nextUrl, wasPressed: useKeyUp('ArrowRight')},
  ]
  const action = find(
    both(
      compose(isNotNil, prop('navigateTo')),
      propEq('wasPressed', true)
    ),
    keyUpActions
  )
  if (action) {
    navigate(action.navigateTo)
  }
  
  const swipeHandlers = useSwipeNavigate(nextUrl, previousUrl, parentUrl)

  return (
    <Layout path={path}>
      <Global
        styles={{
          'body': {
            margin: 0
          }
        }}
      />
      <div {...swipeHandlers}>
        <div className='photo-page' data-testid={path} ref={ref}>
          {previousUrl ?
            <div className='photo-navigation previous'>
              <div><Link to={previousUrl}>◄</Link></div>
            </div> 
            : null}
          <Img fixed={data.photo.childImageSharp.fixed} alt={title} title={title}
            loading='eager' css={dimensions} draggable={false} />
          {parentUrl ?
            <div className='photo-navigation parent'>
              <div><Link to={parentUrl}>⯅</Link></div>
            </div>
            : null}
          {nextUrl ?
            <div className='photo-navigation next'>
              <div><Link to={nextUrl}>►</Link></div>
            </div>
            : null}
        </div>
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
      previousUrl: PropTypes.string,
      nextUrl: PropTypes.string,
      parentUrl: PropTypes.string,
    }),
  }).isRequired
}

export default Photo