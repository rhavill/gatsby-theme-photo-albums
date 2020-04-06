import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import LayoutStyles from '../../styles/Layout'
import MainContentStyles from '../../styles/MainContent'

const Layout = ({children, path}) => 
  <LayoutStyles>
    <Header path={path}/>
    <MainContentStyles>
      {children}
    </MainContentStyles>
  </LayoutStyles>

Layout.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Layout