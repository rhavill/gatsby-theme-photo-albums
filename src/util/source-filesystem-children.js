import startsWith from 'ramda/src/startsWith'

export const getChildren = (path, data) => {
  const children = {
    folders: [
      data.allDirectory.edges.filter(edge => path !== edge.node.relativePath 
        && startsWith(path, edge.node.relativePath))
    ],
    files: []
  };
  console.log('getChildren path', path, 'data', data, 'children', children);
  return children;
}

// export default getChildren;
