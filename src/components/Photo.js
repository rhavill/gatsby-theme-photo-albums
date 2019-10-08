import React from "react";
import PropTypes from "prop-types"

import Layout from '../components/Layout'

const Photo =  ({location}) => {
  console.log('Photo location', location)
  return (
    <Layout location={location}>
    <div className='photo-page'>
      photo
    </div>
    </Layout>
  )
}

Photo.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default Photo