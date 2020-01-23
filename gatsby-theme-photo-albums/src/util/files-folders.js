const curry = require('ramda/src/curry')
const filter = require('ramda/src/filter')
const match = require('ramda/src/match')
const {prependbaseUrl} = require('./url-text')

const getChildPaths = curry(
  (currentPath, paths) => {
    return filter(isParentDirectoryOf(currentPath), paths)
  }
)

/**
 * Determines whether a directory is a parent directory of a file or directory.
 * @param {string} parent The path of a possible parent directory. 
 * @param {string} child The path of a file or directory.
 * @returns {bool}
 */
const isParentDirectoryOf = curry(
  (parent, child) => {
    const regex = new RegExp('^' + parent + '/?[^/]+$')
    return match(regex, child).length > 0
  }
)

const getPagerData = (currentPath, files, filesPerPage) => {
  const pagerData = []
  const children = getChildPaths(currentPath, files)
  const childCount = children.length
  const numPages = Math.ceil(childCount / filesPerPage) || 1
  Array.from({ length: numPages }).forEach((_, i) => {
    pagerData.push({
      limit: filesPerPage,
      skip: i * filesPerPage,
      numPages,
      currentPage: i + 1
    })
  })
  return pagerData
}

/**
 * Accepts an array of gatsby-source-filesystem objects that must have a
 * relativePath property. Adds a url property to all of the objects.
 */
const addUrlProps = curry((baseUrl, filesOrDirectories) => 
  filesOrDirectories.map(fileOrDirectory => ({
    ...fileOrDirectory,
    url: prependbaseUrl(baseUrl, fileOrDirectory.relativePath)
  })))

module.exports = {
  addUrlProps,
  getChildPaths,
  getPagerData,
}