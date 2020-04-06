import React from 'react'
import {cleanup, render, renderer} from '../../src/util/test-utils'
import Photo from '../../src/templates/Photo'
import photoData from '../../test-data/source-filesystem-photo-data'
import {pathToFileTitle, removeFileExtension} from '../../src/util/url-text'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Photo', () => {
  const pageContext = {
    width: 1024,
    height: 768,
    file: {
      previousUrl: '/prev',
      nextUrl: '/next',
      parentUrl: '/parent',
    },
  }
  // This test is being disabled because react-zoom-pan-pinch is causing an error:
  // "TypeError: Cannot read property 'style' of null"
  // it('renders correctly', () => {
  //   const tree = renderer
  //     .create(<Photo path='/base/1' data={photoData.data} pageContext={pageContext} />)
  //     .toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
  it('displays image with "title" attribute containing a title-case version of the photo file name', () => {
    const path = removeFileExtension(photoData.data.photo.childImageSharp.fixed.src)
    const {getAllByTitle} = render(
      <Photo path={path} data={photoData.data} pageContext={pageContext} />
    )
    const expected = pathToFileTitle(path)
    expect(getAllByTitle(expected).length).toBe(1)
  })
  it('passes decoded url to child components', () => {
    const path = '/san-sebasti%c3%a1n/san-sebasti%c3%a1n'  
    const {getAllByTestId} = render(
      <Photo path={path} data={photoData.data} pageContext={pageContext} />
    )
    expect(getAllByTestId('/san-sebastián/san-sebastián').length).toBe(1)
  })
  it('passes path to child components without pathPrefix config variable', () => {
    const path = '/path-prefix/top-level/file.jpg'  
    const {getAllByTestId} = render(
      <Photo path={path} data={photoData.data} pageContext={pageContext} />
    )
    expect(getAllByTestId('/top-level/file').length).toBe(1)
  })
})