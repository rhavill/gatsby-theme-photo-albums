import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import {Header as ThemeHeader} from 'theme-ui'
import FirstBreadcrumbText from './FirstBreadcrumbText'
import breadcrumbs from '../util/breadcrumbs'

const Header = ({ path }) => {
  const links = breadcrumbs(path)

  return (
    <ThemeHeader>
      <nav>{
        links.map((crumb, i) => (
          <Link key={i} to={crumb.path}>
            {i === 0 ?  (<FirstBreadcrumbText/>) : crumb.title}
          </Link>))
      }
      </nav>
    </ThemeHeader>
  )
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Header