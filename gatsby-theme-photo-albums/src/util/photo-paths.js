const forEach = require('ramda/src/forEach')
const keys = require('ramda/src/keys')
const match = require('ramda/src/match')
const {indexedForEach, groupByProp} = require('./ramda-utils')
const {removeFileExtension} = require('./url-text')
const groupByRelativeDirectory = groupByProp('relativeDirectory')

const getPhotoPathsWithPages = (photosPerPage, fileData) => {
  const photoPaths = {}
  const groupedFiles = groupByRelativeDirectory(fileData)
  forEach(relativeDirectory => indexedForEach(
    (file, i) => {
      const pageNumber = Math.ceil((i + 1) / photosPerPage)
      photoPaths[file.url] = getPhotoPathWithPage(
        pageNumber, file.url
      )
    }, 
    groupedFiles[relativeDirectory]
  ), keys(groupedFiles))
  return photoPaths
}

const getPhotoPathWithPage = (pageNumber, url) => {
  url = removeFileExtension(url)
  const matches = match(/^(.*\/)([^/]+)$/, url)
  if (matches && matches[1] && matches[2]) {
    const path =  `${matches[1]}` + (pageNumber > 1 ? `${pageNumber}/` : '') + matches[2]
    return path
  }
  return url
}

module.exports = {getPhotoPathsWithPages, getPhotoPathWithPage}