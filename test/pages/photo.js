import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup, render} from '@testing-library/react'
import Photo from '../../src/pages/photo'
import photoData from '../../test-data/source-filesystem-photo-data'
import {pathToFileTitle} from '../../src/util/url-text'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Photo', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Photo path='/base/1.jpg' data={photoData.data} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('displays images with "title" attributes containing a title-case version of the photo file name', () => {
    const path = photoData.data.photo.childImageSharp.fluid.src
    const {getAllByTitle} = render(
      <Photo path={path} data={photoData.data} />
    )
    const expected = pathToFileTitle(path)
    expect(getAllByTitle(expected).length).toBe(2)
  })
  it('passes decoded url to child components', () => {
    const path = '/san-sebasti%c3%a1n/san-sebasti%c3%a1n.jpg'  
    const {getAllByTestId} = render(
      <Photo path={path} data={photoData.data} />
    )
    expect(getAllByTestId('/san-sebastián/san-sebastián.jpg').length).toBe(1)
  })
  // it('passes path to child components without pathPrefix config variable', () => {
  //   const path = '/path-prefix/top-level/file.jpg'  
  //   const {getAllByTestId} = render(
  //     <Photo path={path} data={photoData.data} />
  //   )
  //   expect(getAllByTestId('/top-level/file.jpg').length).toBe(1)
  // })
})