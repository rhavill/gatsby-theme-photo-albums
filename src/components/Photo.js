import React from "react";
import PropTypes from "prop-types"

import Header from './Header';

export default ({location}) => {
  console.log('Photo location', location)
  return (
    <div>
      <Header path={location.pathname}/>
      <div>photo</div>
    </div>
  )
}

Header.propTypes = {
  location: PropTypes.string.isRequired,
}