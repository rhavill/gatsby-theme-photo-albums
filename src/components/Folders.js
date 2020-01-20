import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import addIndex from 'ramda/src/addIndex'
import compose from 'ramda/src/compose'
import map from 'ramda/src/map'
import Folder from './Folder'
import getChildPaths from '../util/files-folders'

const mapIndexed = addIndex(map)

const Folders = ({path, folders, icon}) => {
  return compose(
    mapIndexed((folder, i) => 
      <Folder key={i} path={folder} icon={icon} />
    ),
    getChildPaths(path)
  )(folders)
}

export const query = graphql`
  fragment FoldersFragment on Query {
    folderIcon: file(relativePath: { eq: "folder.png" }) {
      ...FolderFragment
    }
    folders: allDirectory(filter: {name: {ne: "images"}}, 
        sort: {fields: relativePath}) {
      nodes {
        relativePath
        url
      }
    }
  }
`

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