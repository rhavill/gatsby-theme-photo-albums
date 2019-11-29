const emitter = require('./src/util/event-emitter')
const createPages = require('./create-pages')

let indexContext

emitter.on('indexContext', data => indexContext = data)

exports.createPages = async ({ graphql, actions, reporter }, { photosPerPage = 15 }) => {
  const { createPage } = actions
  createPages(photosPerPage, graphql, reporter, createPage)
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
        ...indexContext
      },
    })  
  }
  if (page.path === '/photo/') {
    deletePage(page)
  }
}