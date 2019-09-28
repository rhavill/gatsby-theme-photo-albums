const path = require(`path`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions
  const result = await graphql(`
    query {
      allDirectory {
        edges {
          node {
            base
            relativePath
          }
        }
      }
      allFile {
        edges {
          node {
            relativePath
            base
            name
            dir
            relativeDirectory
          }
        }
      }
    }
  `)
  result.data.allDirectory.edges.forEach(({ node }) => {
    createPage({
      path: node.relativePath || '/',
      component: path.resolve(`./src/pages/index.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        
      },
    })
  })
  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: node.relativePath,
      component: path.resolve(`./src/components/photo.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        
      },
    })
  })
}