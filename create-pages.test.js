/* eslint-disable no-console */
const allPass = require('ramda/src/allPass')
const compose = require('ramda/src/compose')
const equals = require('ramda/src/equals')
const head = require('ramda/src/head')
const last = require('ramda/src/last')
const path = require('ramda/src/path')
const prop = require('ramda/src/prop')
const reduce = require('ramda/src/reduce')
const takeLast = require('ramda/src/takeLast')
const zip = require('ramda/src/zip')

const createPages = require('./create-pages')
const {objectArrayToPropArray} = require('./src/util/ramda-utils')
const queryResults = require('./src/test-data/create-pages-graphql-results-small')
let files
let folders

const createPage = jest.fn()

const reporter = {
  panicOnBuild: jest.fn(errors => console.error('GraphQL error in test.', errors))
}

const graphql = jest.fn(() => 
  new Promise(resolve => resolve(queryResults))
)

beforeAll(() => graphql().then(() => {
  files = objectArrayToPropArray('relativePath', queryResults.data.photos.nodes)
  folders = objectArrayToPropArray('relativePath', queryResults.data.folders.nodes)
  graphql.mockClear()
  const photosPerPage = 15
  const basePath = '/'
  createPages(basePath, photosPerPage, graphql, reporter, createPage)
    .catch(e => { console.error('createPages test suite failed.', e) })
}))

describe('create-pages', () => {

  it('has 4 files and 4 folders', () => {
    expect(files.length).toBe(4)
    expect(folders.length).toBe(4)
  })

  it('calls graphql function', () => {
    expect(graphql.mock.calls.length).toBe(1)
  })

  it('does not call reporter.panicOnBuild function', () => {
    expect(reporter.panicOnBuild.mock.calls.length).toBe(0)
  })

  it('calls the createPage correctly', () => {
    const exptectedPaths = [
      '2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg', 
      '2019-puerto-rico/jayuya/IMG_20190814_102958452-small.jpg', 
      '2019-puerto-rico/san-juan/P_20190412_061017_vHDR_Auto-small.jpg', 
      '2019-puerto-rico/san-juan/IMG_20190801_180122560_HDR-small.jpg', 
    ]
    // create-folder-pages.test.js should be testing the createPhotoPages 
    // portion of the createPages function in create-pages.js. Here, we will 
    // only look at results from the createPhotoPages portion of the createPages 
    // function. This test is very specific to the jest mock api calls, which
    // result in nested data structures.
    const lastFour = takeLast(4, createPage.mock.calls)
    const allPagesPassTest = reduce(
      (acc, page) => allPass([
        equals(
          head(page), 
          compose(prop('path'), head, last)(page)
        ),
        equals(
          head(page), 
          compose(path(['context', 'relativePath']), head, last)(page)
        ),
      ])
        ? acc 
        : false, true)(zip(exptectedPaths, lastFour))
    
    expect(lastFour.length).toBe(4)
    expect(createPage.mock.calls.length).toBe(8)
    expect(allPagesPassTest).toBe(true)
  })  
 
})
