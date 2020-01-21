const curry = require('ramda/src/curry')
const filter = require('ramda/src/filter')
const match = require('ramda/src/match')

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

module.exports = getChildPaths