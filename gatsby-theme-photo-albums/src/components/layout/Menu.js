import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import {Link} from 'gatsby'
import MenuStyles from '../../styles/Menu'

export const Menu = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleCheck = () => setIsOpen(!isOpen)
  const listDisplay = isOpen ? 'block' : 'none'

  return (
    <MenuStyles>
      <label htmlFor='menu-checkbox'>&#9776;</label>
      <input type='checkbox' id='menu-checkbox' defaultChecked={isOpen} 
        onChange={handleCheck} />
      <ul css={{display: listDisplay}}>{
        links.map((link, i) => (
          <Link key={i} to={link.path}>
            <li>
              {link.title}
            </li>
          </Link>))
      }</ul>
    </MenuStyles>
  )
}

Menu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]).isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ),
}

export default Menu