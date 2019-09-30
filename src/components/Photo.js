import React from "react";
import PropTypes from "prop-types"

import Header from './Header';

const Photo =  ({location}) => {
  console.log('Photo location', location)
  return (
    <div>
      <Header path={location.pathname}/>
      <div>photo</div>
    </div>
  )
}

Photo.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default Photo