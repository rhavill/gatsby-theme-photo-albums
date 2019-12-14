import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import {Layout as ThemeLayout, Main} from 'theme-ui'

const Layout =  ({children, path}) => (
  <ThemeLayout>
    <Header path={path}/>
    <Main>
      {children}
    </Main>
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