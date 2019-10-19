const emitter = require('./src/util/event-emitter')
const createPages = require('./create-pages')

let indexPagerData

emitter.on('indexPagerData', data => indexPagerData = data)

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