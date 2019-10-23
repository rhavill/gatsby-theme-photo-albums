import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import {pathToFileTitle} from '../util/text-utils'

// pageContext is actually used in the graphql query, but eslint thinks it is
// unused
/* eslint-disable-next-line no-unused-vars */
const Photo =  ({data, path, pageContext}) => {
  const title = pathToFileTitle(path)
  return (
    <Layout path={path}>
      <div className='photo-page'>
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
        fluid(maxWidth: 512, srcSetBreakpoints: [512, 614, 819, 1093], fit: COVER) {
          ...GatsbyImageSharpFluid
        }
      }
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