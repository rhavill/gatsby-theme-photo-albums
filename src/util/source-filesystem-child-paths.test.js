import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import getChildPaths from './source-filesystem-child-paths'
import folderData from '../test-data/source-filesystem-folder-data'
import fileData from '../test-data/source-filesystem-file-data'

const folders = map(prop('relativePath'), folderData.folders.nodes)
const files = map(prop('relativePath'), fileData.photos.nodes)

describe('source-filesystem-child-paths', () => {  

  it('returns child directories of current path', () => {
    const path = '/level-one'
    const children = getChildPaths(path, folders)
    const expectedFolders =  [
      '/level-one/level-two',
      '/level-one/another-level-two'
    ]
    expect(children).toEqual(expectedFolders)
  })

  it('returns all top-level directories of root path', () => {
    const path = ''
    const children = getChildPaths(path, folders)
    const expectedFolders = [
      '/level-one',
      '/another-level-one',
      '/yet-another-level-one'
    ]
    expect(children).toEqual(expectedFolders)
  })

  it('returns child files of current path', () => {
    const path = '/level-one'
    const children = getChildPaths(path, files)
    const expectedFiles =  [
      '/level-one/2.jpg'
    ]
    expect(children).toEqual(expectedFiles)
  })

  it('returns all files of root path', () => {
    const path = ''
    const children = getChildPaths(path, files)
    const expectedFolders = [
      '/1.jpg'
    ]
    expect(children).toEqual(expectedFolders)
  })

})