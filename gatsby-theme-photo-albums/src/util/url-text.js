const compose = require('ramda/src/compose')
const concat = require('ramda/src/concat')
const curry = require('ramda/src/curry')
const replace = require('ramda/src/replace')

const toTitleCase = text => 
  text.toLowerCase()
    .split(/[-_]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')

const removeFileExtension = replace(/^(.+)\.[^.]+$/, '$1')

const pathToFile = replace(/.*\/([^/]+$)/, '$1')

const pathToFileTitle = compose(toTitleCase, removeFileExtension, pathToFile)

const prependBaseUrl = curry((baseUrl, relativePath) => {
  // Make sure baseUrl starts and ends with slash (for consistency)
  const base = ensureLeadingAndTrailingSlash(baseUrl)
  return concat(base, relativePath)
})

const ensureTrailingSlash = text => text.slice(-1) === '/' ? text : text + '/'

const ensureLeadingSlash = text => text.charAt(0) === '/' ? text : '/' + text

const ensureLeadingAndTrailingSlash = compose(
  ensureLeadingSlash, ensureTrailingSlash
)

const removePathPrefix = curry((pathPrefix, url) => {
  const regex = new RegExp('^' + pathPrefix)
  return replace(regex, '', url)
})

const removeTrailingSlash = replace(/\/$/, '')

const removeTrailingSlashAndPageNumber = replace(/\/page-\d+$/, '')
         
// First remove trailing slash (if it exists), then remove trailing slash + 
// digit (if they exist)
const removePathPageNumber = compose(
  removeTrailingSlashAndPageNumber, removeTrailingSlash
)

const getPagerUrls = (path, currentPage, numPages) => {
  let urls = {prev: null, next: null}
  const pathWithoutPageNumber = removePathPageNumber(path)
  if (currentPage === 2) {
    urls.prev = pathWithoutPageNumber
  }
  else if (currentPage > 2) {
    urls.prev = pathWithoutPageNumber + '/page-' + (currentPage - 1).toString()
  }
  if (currentPage < numPages) {
    urls.next = pathWithoutPageNumber + '/page-' + (currentPage + 1).toString()
  }

  return urls
}

module.exports = {
  ensureLeadingAndTrailingSlash,
  getPagerUrls,
  pathToFileTitle,
  prependBaseUrl,
  removeFileExtension,
  removePathPrefix,
  toTitleCase,
}