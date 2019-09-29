import startsWith from 'ramda/src/startsWith'

const getChildren = (path, data) => {
  const currentPath = path.replace(/\/$/, '')
  const folders = [], files = []
  data.allDirectory.edges.forEach(edge => {
    // Add leading slash to filesystem path to be consistent with current location path
    const fsPath = '/' + edge.node.relativePath
    console.log('FS fsPath', level(fsPath), fsPath, 'browser currentPath', level(currentPath), currentPath)
    if (currentPath !== fsPath && startsWith(currentPath, fsPath)
        && level(currentPath) + 1 === level(fsPath) && fsPath !== '/') {
      folders.push(fsPath)
    }
  })
  const children = {
    folders,
    files: []
  };
  console.log('getChildren path', path, 'data', data, 'children', children);
  return children;
}

const level = path => path.split('/').length

export default getChildren;
