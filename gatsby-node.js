const createPages = require('./create-pages')

let indexPagerData = {  // used by onCreatePage to set pager data for index page
  limit: 15,
  skip: 15,
  numPages: 1,
  currentPage: 1
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  createPages(graphql, reporter, createPage)
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