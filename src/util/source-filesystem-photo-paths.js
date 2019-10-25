const addIndex = require('ramda/src/addIndex')
const forEach = require('ramda/src/forEach')
const groupBy = require('ramda/src/groupBy')
const keys = require('ramda/src/keys')
const match = require('ramda/src/match')
const prop = require('ramda/src/prop')

const indexedForEach = addIndex(forEach)
const byRelativeDirectory = groupBy(prop('relativeDirectory'))

/**
 * Accepts a number of photos per page and an array of gatsby-source-filesystem 
 * files (photos). Each file in the array should have a "relativePath" 
 * and "relativeDirectory". Returns an object whose keys are "relavivePath"s
 * from the original files array and whose values are Gatsby location filepaths 
 * (URLs).
 */
const getPhotoPathsWithPages = (photosPerPage, fileData) => {
  const photoPaths = {}
  const groupedFiles = byRelativeDirectory(fileData)
  forEach(
    relativeDirectory => indexedForEach(
      (file, i) => {
        const pageNumber = Math.ceil((i + 1) / photosPerPage)
        photoPaths[file.relativePath] = getPhotoPathWithPage(
          pageNumber, file.relativePath
        )
      }, 
      groupedFiles[relativeDirectory]
    ), 
    keys(groupedFiles)
  )
  return photoPaths
}

const getPhotoPathWithPage = (pageNumber, relativePath) => {
  let path =  ''
  const matches = match(/^(.+\/)([^/]+)$/, relativePath)
  if (matches && matches[1] && matches[2]) {
    path = `/${matches[1]}` + (pageNumber > 1 ? `${pageNumber}/` : '') + matches[2]
  }
  else {
    path = '/' + (pageNumber > 1 ? `${pageNumber}/` : '') + relativePath
  }
  return path
}

module.exports = {getPhotoPathsWithPages, getPhotoPathWithPage}