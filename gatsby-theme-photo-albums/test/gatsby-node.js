const fs = require('fs')
const {onPreBootstrap} = require('../gatsby-node')

const deletePage = jest.fn()

jest.mock('fs')
fs.existsSync
  .mockImplementationOnce(() => false)
  .mockImplementationOnce(() => true)
const mkdirSync = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {})

const reporter = {
  info: jest.fn()
}

beforeEach(() => {
  deletePage.mockClear()
})

describe('gatsby-node', () => {

  it('onPreBootstrap creates an albumsPath if it does not exist.', () => {
    onPreBootstrap({reporter}, {albumsPath: 'photos'})
    expect(fs.existsSync).toHaveBeenCalled()
    expect(mkdirSync.mock.calls.length).toBe(1)
  })

  it('onPreBootstrap does not create an albumsPath if it exists.', () => {
    onPreBootstrap({reporter}, {albumsPath: 'photos'})
    expect(fs.existsSync.mock.calls.length).toBe(2)
    expect(mkdirSync.mock.calls.length).toBe(1)
  })

})