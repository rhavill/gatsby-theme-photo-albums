import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import {Layout as ThemeLayout} from 'theme-ui'

const Layout =  ({children, path}) => (
  <ThemeLayout>
    <Header path={path}/>
    <div className='container page'>
      {children}
    </div>
  </ThemeLayout>
)

Layout.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Layout