const compose = require('ramda/src/compose')
const concat = require('ramda/src/concat')
const curry = require('ramda/src/curry')
const path = require('ramda/src/path')
const replace = require('ramda/src/replace')

const toTitleCase = text => 
  text.toLowerCase()
    .split(/[-_]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')

const removeFileExtension = replace(/^(.+)\.[^.]+$/, '$1')

const pathToFile = replace(/.*\/([^/]+$)/, '$1')

const pathToFileTitle = compose(toTitleCase, removeFileExtension, pathToFile)

const removePathPrefix = data => replace(
  path(['site', 'pathPrefix'], data), 
  ''
)

const removebaseUrl = (baseUrl, path) => {
  const newPath = replace(
    // Remove trailing slash (if it exists)
    baseUrl.replace(/\/$/, ''), 
    ''
  )(path)
  return newPath
}

const prependbaseUrl = curry((baseUrl, relativePath) => {
  // Make sure baseUrl starts and ends with slash (for consistency)
  const base = ensureLeadingAndTrailingSlash(baseUrl)
  return concat(base, relativePath)
})

const ensureTrailingSlash = text => text.slice(-1) === '/' ? text : text + '/'

const ensureLeadingSlash = text => text.charAt(0) === '/' ? text : '/' + text

const ensureLeadingAndTrailingSlash = compose(ensureLeadingSlash, ensureTrailingSlash)
const gatsbyPathnameToChildComponentPath = (baseUrl, pathname, graphqlData) => {
  const path = compose(removePathPrefix(graphqlData), decodeURIComponent)(pathname)
  return removebaseUrl(baseUrl, path)
}

module.exports = {
  pathToFile,
  pathToFileTitle,
  prependbaseUrl,
  removeFileExtension,
  toTitleCase,
  gatsbyPathnameToChildComponentPath,
  ensureLeadingAndTrailingSlash,
}