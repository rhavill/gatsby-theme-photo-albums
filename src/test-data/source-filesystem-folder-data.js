import imageData from '../test-data/gatsby-image-data'

const folderData = {
  folderIcon: imageData,
  folders: {
    nodes: [
      {relativePath: '', url: '/base/'},
      {relativePath: 'level-one', url: '/base/level-one'},
      {relativePath: 'another-level-one', url: '/base/another-level-one'},
      {relativePath: 'yet-another-level-one', url: '/base/yet-another-level-one'},
      {relativePath: 'level-one/level-two', url: '/base/level-one/level-two'},
      {relativePath: 'level-one/another-level-two', url: '/base/level-one/another-level-two'},
    ]
  }
}

export default folderData