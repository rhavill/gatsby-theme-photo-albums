const path = require(`path`)
const {getChildren} = require('./src/util/source-filesystem-children')

const getPagerData = (directory, data, photosPerPage) => {
  const pagerData = []
  const children = getChildren(`/${directory}`, data)
  const childCount = children.folders.length + children.files.length
  const numPages = Math.ceil(childCount / photosPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    pagerData.push({
      limit: photosPerPage,
      skip: i * photosPerPage,
      numPages,
      currentPage: i + 1
    })
  })
  return pagerData
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions
  const result = await graphql(`
    query {
      allDirectory(filter: {base: {ne: "images"}}) {
        edges {
          node {
            base
            relativePath
            name
          }
        }
      }
      allFile(filter: {relativePath: {ne: "folder.png"}}) {
        edges {
          node {
            relativePath
            relativeDirectory
            childImageSharp {
              fixed(width: 250, height: 250) {
                width
                height
                src
              }
            }
          }
        }
      }
      site {
        siteMetadata {
          photosPerPage
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allDirectory.edges.forEach(({ node }) => {
    const photosPerPage = result.data.site.siteMetadata.photosPerPage 
    getPagerData(node.relativePath, result.data, photosPerPage)
      .forEach((pagerData, i) => {
        let url = '/' + node.relativePath
        if (i > 0 && url !== '/') {
          url += '/'
        }
        if (i > 0) {
          url += i + 1
        }
        createPage({
          path: url,
          component: path.resolve(`./src/pages/index.js`),
          context: pagerData,
        })
      }
    )
  })
  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: node.relativePath,
      component: path.resolve(`./src/components/Photo.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        
      },
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  // Allow paged results functionality on index page
  const { createPage, deletePage } = actions
  if (page.path === '/') {
    // const photosPerPage = result.data.site.siteMetadata.photosPerPage 
    // getPagerData(node.relativePath, result.data, photosPerPage)
    //   .forEach((pagerData, i) => {
    // console.log('onCreatePage page', page)
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        currentPage: 1,
        numPages: 1,
        limit: 15,
        skip: 0,
      },
    })  }

}