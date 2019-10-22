const compose = require('ramda/src/compose')
const last = require('ramda/src/last')
const prop = require('ramda/src/prop')
const emitter = require('./src/util/event-emitter')
const {onCreatePage} = require('./gatsby-node')

const createPage = jest.fn()
const deletePage = jest.fn()
const actions = {
  createPage,
  deletePage
}
const indexPage = {
  path: '/'
}
const photoPage = {
  path: '/photo/'
}

beforeEach(() => {
  deletePage.mockClear()
})

describe('gatsby-node', () => {

  it('onCreatePage calls createPage and deletePage if page path is "/"', () => {
    onCreatePage({page: indexPage, actions})
    expect(createPage.mock.calls.length).toBe(1)
    expect(deletePage.mock.calls.length).toBe(1)
  })

  it('onCreatePage calls deletePage if page path is "/photo/"', () => {
    onCreatePage({page: photoPage, actions})
    expect(deletePage.mock.calls.length).toBe(1)
  })

  it('listens to indexContext and sets pager data for index page accordingly', () => {
    const pagerData = {limit: 4, skip: 8, numPages: 10, currentPage: 5}
    emitter.emit('indexContext', pagerData)
    onCreatePage({page: indexPage, actions})
    const context = compose(prop('context'), last, last)(createPage.mock.calls)
    expect(context).toEqual(pagerData)
  })
 
})