import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import {getChildPaths} from '../../src/util/files-folders'
import folderData from '../../test-data/source-filesystem-folder-data'
import fileData from '../../test-data/source-filesystem-file-data'

const folders = map(prop('url'), folderData.folders.nodes)
const files = map(prop('url'), fileData.photos.nodes)

describe('source-filesystem-child-paths', () => {  

  it('returns child directories of current path', () => {
    const path = '/base/level-one'
    const children = getChildPaths(path, folders)
    const expectedFolders =  [
      '/base/level-one/level-two',
      '/base/level-one/another-level-two'
    ]
    expect(children).toEqual(expectedFolders)
  })

  it('returns all top-level directories of root path', () => {
    const path = '/base'
    const children = getChildPaths(path, folders)
    const expectedFolders = [
      '/base/level-one',
      '/base/another-level-one',
      '/base/yet-another-level-one'
    ]
    expect(children).toEqual(expectedFolders)
  })

  it('returns child files of current path', () => {
    const path = '/base/level-one'
    const children = getChildPaths(path, files)
    const expectedFiles =  [
      '/base/level-one/2.jpg'
    ]
    expect(children).toEqual(expectedFiles)
  })

  it('returns all files of root path', () => {
    const path = '/base'
    const children = getChildPaths(path, files)
    const expectedFiles = [
      '/base/1.jpg'
    ]
    expect(children).toEqual(expectedFiles)
  })

})