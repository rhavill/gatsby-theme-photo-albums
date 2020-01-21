import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import Img from 'gatsby-image'
import {pathToFileTitle} from '../util/text-utils'

const Folder = ({path, icon}) => {
  const title = pathToFileTitle(path)
  return (
    <article className='folder' data-testid='folder'>
      <Link to={path}>
        <Img fixed={icon} alt={title} title={title} />
        <div className='folder-title'>{title}</div>
      </Link>
    </article>
  )
}

Folder.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired
}

export default Folder