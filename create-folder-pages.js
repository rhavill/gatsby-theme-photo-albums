const path = require(`path`)
const emitter = require('./src/util/event-emitter')
const {getPagerData} = require('./src/util/source-filesystem-pager-data')

const createFolderPages = (photosPerPage, createPage, files, folders) => {
  folders.forEach(folder => {
    const pagerData = getPagerData(folder, files, photosPerPage)
    pagerData
      .forEach((pagerData, i) => {
        let url = '/' + folder
        if (i > 0 && url !== '/') {
          url += '/'
        }
        if (i > 0) {
          url += i + 1
        }
        if (url === '/') {
          emitter.emit('indexPagerData', pagerData)
        }
        createPage({
          path: url,
          component: path.resolve(`./src/pages/index.js`),
          context: pagerData,
        })
      }
    )
  })
}

module.exports = createFolderPages