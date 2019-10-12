const match = require('ramda/src/match')

const getChildren = (folder, data) => {
  // remove trailing slash if it exists
  const currentPath = folder.replace(/\/\d+$/, '')
  const folders = [], files = []
  data.allDirectory.edges.forEach(edge => {
    // Add leading slash to filesystem path to be consistent with current location path
    const fsPath = '/' + edge.node.relativePath
    if (isParentDirectoryOf(currentPath, fsPath)) {
      folders.push(fsPath)
    }
  })
  data.allFile.edges.forEach(edge => {
    // Add leading slash to filesystem file and directory to be consistent with current location path
    const fsPath = '/' + edge.node.relativePath
    const fixed = edge.node.childImageSharp.fixed;
    if (isParentDirectoryOf(currentPath, fsPath)) {
      files.push({fsPath, fixed})
    }
  })
  const children = {
    folders,
    files
  };
  return children;
}

/**
 * Determines whether a directory is a parent directory of a file or directory.
 * @param {string} parent The path of a possible parent directory. 
 * @param {string} child The path of a file or directory.
 * @returns {bool}
 */
const isParentDirectoryOf = (parent, child) => {
  const regex = new RegExp('^' + parent + '/?[^/]+$')
  return match(regex, child).length > 0
}

module.exports = {
  getChildren,
  isParentDirectoryOf,
}