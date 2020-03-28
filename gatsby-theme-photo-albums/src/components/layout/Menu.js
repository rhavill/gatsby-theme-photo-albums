import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import {Link} from 'gatsby'
import {css} from '@emotion/core'
import {withTheme} from 'emotion-theming'

export const Menu = ({ links, theme }) => {
  
  const [isOpen, setIsOpen] = useState(false)
  const handleCheck = () => setIsOpen(!isOpen)
  const listDisplay = isOpen ? 'block' : 'none'

  const nav = css`
    background-color: ${theme.colors.primary};
  `

  const ul = css`
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: ${listDisplay};
  `

  const li = css`
    display: block;
    padding: .5rem;
    /*box-sizing: border-box;*/
    border-top: 1px solid;
  `
  const label = css`
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `
  return (
    <nav css={nav}>
      <label htmlFor='menu-checkbox' css={label}>&#9776;</label>
      <input type='checkbox' id='menu-checkbox' defaultChecked={isOpen} 
        onChange={handleCheck} css={{display: 'none'}} />
      <ul css={ul}>{
        links.map((link, i) => (
          <Link key={i} to={link.path}>
            <li css={li}>
              {link.title}
            </li>
          </Link>))
      }</ul>
    </nav>
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
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default withTheme(Menu)