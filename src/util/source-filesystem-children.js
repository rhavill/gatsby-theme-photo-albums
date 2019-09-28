export const getChildren = (data) => {
  const children = {
    folders: [
      data.allDirectory.edges.map(edge => edge.node)
    ],
    files: []
  };
  console.log('getChildren data', data, 'children', children);
  return children;
}

// export default getChildren;
