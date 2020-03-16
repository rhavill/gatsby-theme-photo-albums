import React from 'react'
import PropTypes from 'prop-types'
import {Header as ThemeHeader} from 'theme-ui'
import FirstBreadcrumbText from './FirstBreadcrumbText'
import Menu from './Menu'
import breadcrumbs from '../../util/breadcrumbs'

const Header = ({ path }) => {
  const links = breadcrumbs(path)
  if (links.length) {
    links[0].title = <FirstBreadcrumbText />
  }
  return (
    <ThemeHeader>
      <Menu links={links} />
    </ThemeHeader>
  )
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Header