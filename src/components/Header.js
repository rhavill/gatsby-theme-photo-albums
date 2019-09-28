import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import breadcrumbs from '../util/breadcrumbs'

const Header = ({ path }) => {
  const links = breadcrumbs(path)
  return (
    <header>
      <nav>{
         links.map((crumb, i) => (
          <Link key={i} to={crumb.path}>
            {crumb.title}&nbsp;
          </Link>))
        }
      </nav>
    </header>
  )
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Header;