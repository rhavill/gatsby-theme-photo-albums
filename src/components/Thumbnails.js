import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import addIndex from 'ramda/src/addIndex'
import compose from 'ramda/src/compose'
import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import tail from 'ramda/src/tail'
import Thumbnail from './Thumbnail'
import getChildPaths from '../util/source-filesystem-child-paths'
import {getPhotoPathWithPage} from '../util/source-filesystem-photo-paths'

const mapIndexed = addIndex(map)
const pathToRelativePath = tail

const Thumbnails = ({path, data, currentPage}) => {
  return compose(
    mapIndexed((photoPath, i) => 
      <Thumbnail key={i} path={
        getPhotoPathWithPage(currentPage, pathToRelativePath(photoPath))
      } imageData={data.photos.nodes[i]} />
    ),
    getChildPaths(path),
    map(prop('relativePath'))
  )(data.photos.nodes)
}

export const query = graphql`
  fragment ThumbnailsFragment on FileConnection {
    nodes {
      relativePath
      ...ThumbnailFragment
    }
  }
`

Thumbnails.propTypes = {
  path: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.shape({
    photos: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          relativePath: PropTypes.string.isRequired,
        }).isRequired   
      ).isRequired
    }).isRequired  
  }).isRequired
}

export default Thumbnails