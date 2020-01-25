import {getPhotoPathsWithPages, getPhotoPathWithPage} from '../../src/util/photo-paths'
import queryResults from '../../test-data/create-pages-graphql-results'

describe('photo-paths', () => {  
  it('returns Gatsby location pathnames for some gatsby-source-filesystem files', () => {
    const photosPerPage = 10
    const expected = {
      '/base/2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg': 
        '/base/2019-puerto-rico/jayuya/IMG_20190814_113735817-small',
      '/base/2019-puerto-rico/jayuya/IMG_20190814_102958452-small.jpg':
        '/base/2019-puerto-rico/jayuya/IMG_20190814_102958452-small',
      '/base/2019-puerto-rico/san-juan/P_20190412_061017_vHDR_Auto-small.jpg':
        '/base/2019-puerto-rico/san-juan/P_20190412_061017_vHDR_Auto-small',
      '/base/2019-puerto-rico/san-juan/IMG_20190801_180122560_HDR-small.jpg':
        '/base/2019-puerto-rico/san-juan/IMG_20190801_180122560_HDR-small',
    }
    const photoPaths = getPhotoPathsWithPages(photosPerPage, queryResults.data.photos.nodes)
    expect(photoPaths).toEqual(expected)
  })
  it('returns Gatsby location pathnames for second page of photos', () => {
    const photosPerPage = 1
    const expected = {
      '/base/2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg': 
        '/base/2019-puerto-rico/jayuya/IMG_20190814_113735817-small',
      '/base/2019-puerto-rico/jayuya/IMG_20190814_102958452-small.jpg':
        '/base/2019-puerto-rico/jayuya/2/IMG_20190814_102958452-small',
      '/base/2019-puerto-rico/san-juan/P_20190412_061017_vHDR_Auto-small.jpg':
        '/base/2019-puerto-rico/san-juan/P_20190412_061017_vHDR_Auto-small',
      '/base/2019-puerto-rico/san-juan/IMG_20190801_180122560_HDR-small.jpg':
        '/base/2019-puerto-rico/san-juan/2/IMG_20190801_180122560_HDR-small',
    }
    const photoPaths = getPhotoPathsWithPages(photosPerPage, queryResults.data.photos.nodes)
    expect(photoPaths).toEqual(expected)
  })
  it('returns Gatsby location pathnames for file in root directory', () => {
    const photosPerPage = 2
    const rootPhotos = [
      {relativePath: '1.jpg', relativeDirectory: '', url: '/1.jpg'},
      {relativePath: '2.jpg', relativeDirectory: '', url: '/2.jpg'},
      {relativePath: '3.jpg', relativeDirectory: '', url: '/3.jpg'},
      {relativePath: '4.jpg', relativeDirectory: '', url: '/4.jpg'},
      {relativePath: '5.jpg', relativeDirectory: '', url: '/5.jpg'},
    ]
    const expected = {
      '/1.jpg': '/1',
      '/2.jpg': '/2',
      '/3.jpg': '/2/3',
      '/4.jpg': '/2/4',
      '/5.jpg': '/3/5',
    }
    const photoPaths = getPhotoPathsWithPages(photosPerPage, rootPhotos)
    expect(photoPaths).toEqual(expected)
  })

  it('creates URL with page number when provided with a relative path and page number', () => {
    const pageNumber = 7
    const url = '/one/two/file.jpg'
    let expected = '/one/two/7/file'
    expect(getPhotoPathWithPage(pageNumber, url)).toEqual(expected)
  })
  it('creates URL without page number for first page', () => {
    const pageNumber = 1
    const url = '/one/two/file.jpg'
    let expected = '/one/two/file'
    expect(getPhotoPathWithPage(pageNumber, url)).toEqual(expected)
  })
  it('creates URL with page number when provided with a file in root path and page number', () => {
    const pageNumber = 7
    const url = '/file.jpg'
    let expected = '/7/file'
    expect(getPhotoPathWithPage(pageNumber, url)).toEqual(expected)
  })
  it('creates URL without page number for file in root path and first page', () => {
    const pageNumber = 1
    const url = '/file.jpg'
    let expected = '/file'
    expect(getPhotoPathWithPage(pageNumber, url)).toEqual(expected)
  })

  
})