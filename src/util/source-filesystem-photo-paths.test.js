import {getPhotoPathsWithPages, getPhotoPathWithPage} from './source-filesystem-photo-paths'
import queryResults from '../test-data/create-pages-graphql-results'

describe('source-filesystem-photo-paths', () => {  
  it('returns Gatsby location pathnames for some gatsby-source-filesystem files', () => {
    const photosPerPage = 10
    const photoPaths = getPhotoPathsWithPages(photosPerPage, queryResults.data.photos.nodes)
    let relativePath = '2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg'
    let expected = '/' + relativePath
    expect(photoPaths[relativePath]).toEqual(expected)
    relativePath = '2019-puerto-rico/jayuya/IMG_20190814_103147506-small.jpg'
    expected = '/' + relativePath
    expect(photoPaths[relativePath]).toEqual(expected)
  })
  it('returns Gatsby location pathnames for second page of photos', () => {
    const photosPerPage = 10
    const photoPaths = getPhotoPathsWithPages(photosPerPage, queryResults.data.photos.nodes)
    let relativePath = '2019-puerto-rico/jayuya/IMG_20190814_115110329-small.jpg'
    let expected = '/2019-puerto-rico/jayuya/2/IMG_20190814_115110329-small.jpg'
    expect(photoPaths[relativePath]).toEqual(expected)
  })
  it('returns Gatsby location pathnames for file in root directory', () => {
    const photosPerPage = 2
    const rootPhotos = [
      {relativePath: '1.jpg', relativeDirectory: '', base: '1.jpg'},
      {relativePath: '2.jpg', relativeDirectory: '', base: '2.jpg'},
      {relativePath: '3.jpg', relativeDirectory: '', base: '3.jpg'},
      {relativePath: '4.jpg', relativeDirectory: '', base: '4.jpg'},
      {relativePath: '5.jpg', relativeDirectory: '', base: '5.jpg'},
    ]
    const photoPaths = getPhotoPathsWithPages(photosPerPage, rootPhotos)
    let relativePath = '1.jpg'
    let expected = '/1.jpg'
    expect(photoPaths[relativePath]).toEqual(expected)
    relativePath = '5.jpg'
    expected = '/3/5.jpg'
    expect(photoPaths[relativePath]).toEqual(expected)
  })
  it('creates URL with page number when provided with a relative path and page number', () => {
    const pageNumber = 7
    const relativePath = 'one/two/file.jpg'
    let expected = '/one/two/7/file.jpg'
    expect(getPhotoPathWithPage(pageNumber, relativePath)).toEqual(expected)
  })
  it('creates URL without page number for first page', () => {
    const pageNumber = 1
    const relativePath = 'one/two/file.jpg'
    let expected = '/one/two/file.jpg'
    expect(getPhotoPathWithPage(pageNumber, relativePath)).toEqual(expected)
  })
  it('creates URL with page number when provided with a file in root path and page number', () => {
    const pageNumber = 7
    const relativePath = 'file.jpg'
    let expected = '/7/file.jpg'
    expect(getPhotoPathWithPage(pageNumber, relativePath)).toEqual(expected)
  })
  it('creates URL without page number for file in root path and first page', () => {
    const pageNumber = 1
    const relativePath = 'file.jpg'
    let expected = '/file.jpg'
    expect(getPhotoPathWithPage(pageNumber, relativePath)).toEqual(expected)
  })

  
})