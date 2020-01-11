import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import addIndex from 'ramda/src/addIndex'
import compose from 'ramda/src/compose'
import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import Folder from './Folder'
import getChildPaths from '../util/source-filesystem-child-paths'
import {prependBasePath} from '../util/text-utils'

const mapIndexed = addIndex(map)

const Folders = ({basePath, path, data}) => {
  return compose(
    mapIndexed((folder, i) => 
      <Folder key={i} path={folder} imageData={data.folderIcon} />
    ),
    map(prependBasePath(basePath)),
    getChildPaths(path),
    map(prop('relativePath'))
  )(data.folders.nodes)
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
      }
    }
  }
`

Folders.propTypes = {
  basePath: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  data: PropTypes.shape({
    folderIcon: PropTypes.object.isRequired,
    folders: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          relativePath: PropTypes.string.isRequired
        }).isRequired   
      ).isRequired
    }).isRequired  
  }).isRequired
}

export default Folders