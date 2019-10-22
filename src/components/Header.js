import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'

import breadcrumbs from '../util/breadcrumbs'

const Header = ({ path, rootTitle }) => {
  const links = breadcrumbs(path, rootTitle)
  return (
    <header>
      <nav className='container'>{
        links.map((crumb, i) => (
          <Link key={i} to={crumb.path}>
            {crumb.title}
          </Link>))
      }
      </nav>
    </header>
  )
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
  rootTitle: PropTypes.string,
}

Header.defaultProps = { 
  rootTitle: 'Home',
}

export default Header