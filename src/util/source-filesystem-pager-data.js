const getChildPaths = require('./source-filesystem-child-paths')

/**
 * When provided with a gatsby-source-filesystem relativePath of a directory 
 * and some gatsby-source-filesystem relativePath values of files, determines 
 * pager data needed to display the files in multiple pages.
 * @param {string} currentPath The gatsby-source-filesystem relativePath of a possible parent directory. 
 * @param {string[]} files An array of gatsby-source-filesystem relativePath values of files.
 * @param {integer} filesPerPage The maximum number of files to display on each page
 * @returns {object[]} An array of pager data objects for each child file of the current path
 */
const getPagerData = (currentPath, files, filesPerPage) => {
  const pagerData = []
  const children = getChildPaths(`/${currentPath}`, files)
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

module.exports = {
  getPagerData
}