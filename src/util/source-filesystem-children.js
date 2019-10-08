import startsWith from 'ramda/src/startsWith'

const getChildren = (path, data) => {
  // remove trailing slash if it exists
  const currentPath = path.replace(/\/$/, '')
  const folders = [], files = []
  data.allDirectory.edges.forEach(edge => {
    // Add leading slash to filesystem path to be consistent with current location path
    const fsPath = '/' + edge.node.relativePath
    if (currentPath !== fsPath && startsWith(currentPath, fsPath)
        && level(currentPath) + 1 === level(fsPath) && fsPath !== '/') {
      folders.push(fsPath)
    }
  })
  data.allFile.edges.forEach(edge => {
    // Add leading slash to filesystem file and directory to be consistent with current location path
    const fsPath = '/' + edge.node.relativePath
    const fsDir = '/' + edge.node.relativeDirectory
    const fixed = edge.node.childImageSharp.fixed;
    if (fsDir === currentPath || (fsDir === '/' && currentPath === '')) {
      files.push({fsPath, fixed})
    }
  })
  const children = {
    folders,
    files
  };
  return children;
}

const level = path => path.split('/').length

export default getChildren;
