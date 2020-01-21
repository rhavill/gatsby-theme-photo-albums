import React from 'react'
import PropTypes from 'prop-types'
import compose from 'ramda/src/compose'
import Folder from './Folder'
import getChildPaths from '../util/files-folders'
import {mapIndexed} from '../util/ramda-utils'

const Folders = ({path, folders, icon}) => {
  return compose(
    mapIndexed((folder, i) => 
      <Folder key={i} path={folder} icon={icon} />
    ),
    getChildPaths(path)
  )(folders)
}

Folders.propTypes = {
  path: PropTypes.string.isRequired,
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