import React from "react";
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Layout from '../components/Layout'

const Photo =  ({data, path, pageContext}) => {
  return (
    <Layout path={path}>
    <div className='photo-page'>
      <Img fluid={data.photo.childImageSharp.fluid}  alt={'fixme'}/>
    </div>
    </Layout>
  )
}
// set "fit" to CONTAIN or COVER?
export const query = graphql`
  query photoQuery($relativePath: String!) {
    photo: file(relativePath: {eq: $relativePath}) {
      childImageSharp {
        fluid(maxWidth: 512, srcSetBreakpoints: [512, 614], fit: COVER) {
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