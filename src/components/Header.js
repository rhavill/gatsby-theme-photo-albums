import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ path }) => {
  const links = crumbs(path)
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

const crumbs = path => {
  const parts = path === '/' ? [''] : path.split('/')
  return parts
    .map((folder, i) => ({
      title: folder === '' ? 'Home' : toTitleCase(folder),
      path: folder === '' ? '/' : parts.filter((part, j) => j <= i).join('/') 
    }))
}

const toTitleCase = text => 
  text.toLowerCase()
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

Header.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Header;