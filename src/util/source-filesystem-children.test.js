import getChildren from './source-filesystem-children'
import filesystemData from './source-filesytem-test-data';

describe("source-filesystem-children", () => {  

  it("returns child directories of current path", () => {
    const path = '/level-one'
    const children = getChildren(path, filesystemData)
    const expectedFolders =  [
      '/level-one/level-two',
      '/level-one/another-level-two'
    ]
    expect(children.folders).toEqual(expectedFolders)
  })

  it("returns all top-level directories of root path", () => {
    const path = ''
    const children = getChildren(path, filesystemData)
    const expectedFolders = [
      '/level-one',
      '/another-level-one',
      '/yet-another-level-one'
    ]
    expect(children.folders).toEqual(expectedFolders)
  })

  it("returns files of current path", () => {
    const path = '/level-one/level-two'
    const children = getChildren(path, filesystemData)
    const expectedFiles =  [
      '/level-one/level-two/3.jpg'
    ]
    expect(children.files).toEqual(expectedFiles)
  })

  it("returns all top-level files of root path", () => {
    const path = ''
    const children = getChildren(path, filesystemData)
    const expectedFiles = [
      '/1.jpg'
    ]
    expect(children.files).toEqual(expectedFiles)
  })  
})