const addIndex = require('ramda/src/addIndex')
const forEach = require('ramda/src/forEach')
const groupBy = require('ramda/src/groupBy')
const keys = require('ramda/src/keys')
const match = require('ramda/src/match')
const prop = require('ramda/src/prop')

const indexedForEach = addIndex(forEach)
const byRelativeDirectory = groupBy(prop('relativeDirectory'))

const getPhotoPathsWithPages = (photosPerPage, fileData) => {
  const photoPaths = {}
  const groupedFiles = byRelativeDirectory(fileData)
  forEach(relativeDirectory => indexedForEach(
    (file, i) => {
      const pageNumber = Math.ceil((i + 1) / photosPerPage)
      photoPaths[file.url] = getPhotoPathWithPage(pageNumber, file.url)
    }, 
    groupedFiles[relativeDirectory]
  ), keys(groupedFiles))
  return photoPaths
}

const getPhotoPathWithPage = (pageNumber, url) => {
  const matches = match(/^(.+\/)([^/]+)$/, url)
  if (matches && matches[1] && matches[2]) {
    const path = `${matches[1]}` + (pageNumber > 1 ? `${pageNumber}/` : '') + matches[2]
    return path
  }
  return url
}

module.exports = {getPhotoPathsWithPages, getPhotoPathWithPage}