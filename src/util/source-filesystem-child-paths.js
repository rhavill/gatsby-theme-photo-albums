const compose = require('ramda/src/compose')
const concat = require('ramda/src/concat')
const curry = require('ramda/src/curry')
const filter = require('ramda/src/filter')
const map = require('ramda/src/map')
const match = require('ramda/src/match')
const replace = require('ramda/src/replace')

/**
 * When provided with a Gatsby location path and some gatsby-source-filesystem 
 * relativePath values, determines the Gatsby-compatible location paths of the 
 * child directories.
 * @param {string} currentPath The Gatsby location path of a possible parent directory. 
 * @param {string[]} folders An array of gatsby-source-filesystem relativePath values from the allDirectory query type.
 * @returns {string[]} An array of Gatsby location paths that are children of currentPath
 */
const getChildPaths = curry(
  (currentPath, folders) => 
    compose(
      filterChildPaths(currentPath),
      addLeadingSlashes
    )(folders)
)

const filterChildPaths = currentPath =>
  filter(
    compose(
      isParentDirectoryOf,
      removeTrailingSlashAndPageNumber
    )(currentPath)
  )

// remove trailing slash and digit if it they exist.
const removeTrailingSlashAndPageNumber = replace(/\/\d+$/, '')

const addLeadingSlash = concat('/')

// Add leading slashes to filesystem paths to be consistent with Gatsby location path
const addLeadingSlashes = map(addLeadingSlash)

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