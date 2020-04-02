const forEach = require('ramda/src/forEach')
const keys = require('ramda/src/keys')
const match = require('ramda/src/match')
const {indexedForEach, groupByProp} = require('./ramda-utils')
const {removeFileExtension, ensureLeadingAndTrailingSlash} = require('./url-text')
const groupByRelativeDirectory = groupByProp('relativeDirectory')

const getPhotoPathsWithPages = (photosPerPage, fileData) => {
  const photoPaths = {}
  const groupedFiles = groupByRelativeDirectory(fileData)
  forEach(relativeDirectory => { 
    let previousUrl = null
    let previousUrlWithPage = null
    return indexedForEach(
      (file, i) => {
        const pageNumber = Math.ceil((i + 1) / photosPerPage)
        photoPaths[file.url] = {
          url: getPhotoPathWithPage(pageNumber, file.url),
          previousUrl: previousUrlWithPage,
          nextUrl: null,
          parentUrl: appendPageNumberToUrl(pageNumber, file.parentUrl),
        }
        if (previousUrl) {
          photoPaths[previousUrl].nextUrl = photoPaths[file.url].url
        }
        previousUrl = file.url
        previousUrlWithPage = photoPaths[file.url].url
      }, 
      groupedFiles[relativeDirectory]
    )
  }, keys(groupedFiles))
  return photoPaths
}

const getPhotoPathWithPage = (pageNumber, url) => {
  url = removeFileExtension(url)
  const matches = match(/^(.*\/)([^/]+)$/, url)
  if (matches && matches[1] && matches[2]) {
    const path =  `${matches[1]}` + (pageNumber > 1 ? `page-${pageNumber}/` : '') + matches[2]
    return path
  }
  return url
}

const appendPageNumberToUrl = (pageNumber, url) => {
  let path = url ? url : null
  if (path && pageNumber > 1) {
    path = `${ensureLeadingAndTrailingSlash(path)}page-${pageNumber}`
  }
  return path
}

module.exports = {
  getPhotoPathsWithPages, 
  getPhotoPathWithPage,
}