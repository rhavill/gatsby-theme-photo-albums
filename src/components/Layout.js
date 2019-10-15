import React from "react"
import PropTypes from "prop-types"
import Header from './Header'

const Layout =  ({children, path}) => (
  <div className='wrapper'>
    <Header path={path}/>
    <div className="container page">
      {children}
    </div>
  </div>
)

Layout.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]).isRequired
}

export default Layout