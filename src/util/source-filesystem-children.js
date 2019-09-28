export const getChildren = (path, data) => {
  const children = {
    folders: [
      data.allDirectory.edges.map(edge => edge.node)
    ],
    files: []
  };
  console.log('getChildren path', path, 'data', data, 'children', children);
  return children;
}

// export default getChildren;
