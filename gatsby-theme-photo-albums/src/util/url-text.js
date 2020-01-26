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

const ensureLeadingAndTrailingSlash = compose(ensureLeadingSlash, ensureTrailingSlash)

const removePathPrefix = curry((pathPrefix, url) => {
  const regex = new RegExp('^' + pathPrefix)
  return replace(regex, '', url)
})

const getPagerUrls = (path, currentPage, numPages) => {
  let urls = {prev: null, next: null}
  const pathWithoutPageNumber = path.replace(/\/?\d+$/, '')
  if (currentPage === 2) {
    urls.prev = pathWithoutPageNumber
  }
  else if (currentPage > 2) {
    urls.prev = pathWithoutPageNumber + '/' + (currentPage - 1).toString()
  }
  if (currentPage < numPages) {
    urls.next = pathWithoutPageNumber + '/' + (currentPage + 1).toString()
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