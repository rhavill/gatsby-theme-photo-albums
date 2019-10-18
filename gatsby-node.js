const path = require(`path`)
const {getChildren} = require('./src/util/source-filesystem-children')
// /^2019-puerto-rico\/jayuya\/[^/]+$/
let photosPerPage // set from graphql query that searches gatsby-config.js
let indexPagerData // used by onCreatePage to set pager data for index page

const getPagerData = (directory, data) => {
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
      site {
        siteMetadata {
          photosPerPage
        }
      }
      allDirectory(filter: {name: {ne: "images"}}) {
        edges {
          node {
            relativePath
          }
        }
      }
      allFile(filter: {relativePath: {ne: "folder.png"}}) {
        edges {
          node {
            relativePath
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
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  photosPerPage = result.data.site.siteMetadata.photosPerPage

  result.data.allDirectory.edges.forEach(({ node }) => {
    getPagerData(node.relativePath, result.data)
      .forEach((pagerData, i) => {
        let url = '/' + node.relativePath
        if (i > 0 && url !== '/') {
          url += '/'
        }
        if (i > 0) {
          url += i + 1
        }
        if (url === '/') {
          indexPagerData = pagerData
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
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        ...indexPagerData
      },
    })  
  }
}