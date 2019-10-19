const createFolderPages = require('./create-folder-pages')
const {objectArrayToPropArray} = require('./src/util/ramda-utils')
const queryResults = require('./src/test-data/create-pages-graphql-results')

const pageCreator = () => {
  let pages = []
  const getPages = () => pages
  const createPage = ({path, context}) => pages.push({path, component: 'dummy', context})
  return {getPages, createPage}
}

describe("create-folder-pages", () => {
  it("creates folder pages from graphql data", () => {
    // This test assumes photosPerPage is 15
    const photosPerPage = queryResults.data.site.siteMetadata.photosPerPage
    const files = objectArrayToPropArray('relativePath', queryResults.data.photos.nodes)
    const folders = objectArrayToPropArray('relativePath', queryResults.data.folders.nodes)
    const creator = pageCreator()
    const exptected = [
      {
        path: '/', 
        component: 'dummy', 
        context: {limit: photosPerPage, skip: 0, numPages: 1, currentPage: 1}
      },
      {
        path: '/2019-puerto-rico', 
        component: 'dummy', 
        context: {limit: photosPerPage, skip: 0, numPages: 1, currentPage: 1}
      },
      {
        path: '/2019-puerto-rico/jayuya', 
        component: 'dummy', 
        context: {limit: photosPerPage, skip: 0, numPages: 4, currentPage: 1}
      },
      {
        path: '/2019-puerto-rico/jayuya/2', 
        component: 'dummy', 
        context: {limit: photosPerPage, skip: 15, numPages: 4, currentPage: 2}
      },
      {
        path: '/2019-puerto-rico/jayuya/3', 
        component: 'dummy', 
        context: {limit: photosPerPage, skip: 30, numPages: 4, currentPage: 3}
      },
      {
        path: '/2019-puerto-rico/jayuya/4', 
        component: 'dummy', 
        context: {limit: photosPerPage, skip: 45, numPages: 4, currentPage: 4}
      },
      {
        path: '/2019-puerto-rico/san-juan', 
        component: 'dummy', 
        context: {limit: photosPerPage, skip: 0, numPages: 1, currentPage: 1}
      },
    ]
    createFolderPages(photosPerPage, creator.createPage, files, folders)
    expect(creator.getPages()).toEqual(exptected)
  })  
  it("creates folder page for index page with single folder", () => {
    const creator = pageCreator()
    const exptected = [
      {
        path: '/', 
        component: 'dummy', 
        context: {limit: 5, skip: 0, numPages: 1, currentPage: 1}
      },
      {
        path: '/sub-folder', 
        component: 'dummy', 
        context: {limit: 5, skip: 0, numPages: 1, currentPage: 1}
      },
    ]
    createFolderPages(5, creator.createPage, [], ['', 'sub-folder'])
    expect(creator.getPages()).toEqual(exptected)
  })  
})
