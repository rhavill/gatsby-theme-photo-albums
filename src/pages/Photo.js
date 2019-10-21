import React from "react";
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Layout from '../components/Layout'

const Photo =  ({path}) => {
  console.log('Photo path', path)
  return (
    <Layout path={path}>
    <div className='photo-page'>
      photo
    </div>
    </Layout>
  )
}

Photo.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Photo