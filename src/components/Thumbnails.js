import React from 'react'
import PropTypes from 'prop-types'
import Thumbnail from './Thumbnail'
import {mapIndexed} from '../util/ramda-utils'
import {getPhotoPathWithPage} from '../util/photo-paths'

const Thumbnails = ({files, currentPage}) => {
  return mapIndexed((file, i) => 
    <Thumbnail key={i} path={getPhotoPathWithPage(currentPage, file.url)} 
      imageData={file.imageData} />
  )(files)
}

Thumbnails.propTypes = {
  currentPage: PropTypes.number.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      imageData: PropTypes.object.isRequired,
    }).isRequired   
  ).isRequired
}

export default Thumbnails