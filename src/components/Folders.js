import React from 'react'
import PropTypes from 'prop-types'
import Folder from './Folder'
import {mapIndexed} from '../util/ramda-utils'

const Folders = ({folders, icon}) => {
  return mapIndexed((folder, i) => 
    <Folder key={i} path={folder} icon={icon} />
  )(folders)
}

Folders.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.string.isRequired, 
  ).isRequired,
  icon: PropTypes.shape({
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired
}

export default Folders