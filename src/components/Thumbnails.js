import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import addIndex from 'ramda/src/addIndex'
import compose from 'ramda/src/compose'
import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import Thumbnail from './Thumbnail'
import getChildPaths from '../util/source-filesystem-child-paths'

const mapIndexed = addIndex(map)

const Thumbnails = ({path, data}) => 
  compose(
    mapIndexed((folder, i) => 
      <Thumbnail key={i} path={folder} imageData={data.photos.nodes[i]} />
    ),
    getChildPaths(path),
    map(prop('relativePath'))
  )(data.photos.nodes)

export const query = graphql`
  fragment ThumbnailsFragment on Query {
    photos: allFile(filter: {relativePath: {ne: "folder.png"}} limit: $limit skip: $skip) {
      nodes {
        relativePath
        ...ThumbnailFragment
      }
    }
  }
`

Thumbnails.propTypes = {
  path: PropTypes.string.isRequired,
  data: PropTypes.shape({
    photos: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          relativePath: PropTypes.string.isRequired
        }).isRequired   
      ).isRequired
    }).isRequired  
  }).isRequired
}

export default Thumbnails