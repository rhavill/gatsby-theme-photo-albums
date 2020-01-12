import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup, render} from '@testing-library/react'
import Photo from '../pages/photo'
import photoData from '../test-data/source-filesystem-photo-data'
import {pathToFileTitle} from '../util/text-utils'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Photo', () => {
  it('renders correctly', () => {
    const pageContext = {basePath: '/'}
    const tree = renderer
      .create(<Photo path='1.jpg' data={photoData.data} pageContext={pageContext}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('displays images with "title" attributes containing a title-case version of the photo file name', () => {
    const pageContext = {basePath: '/'}
    const path = photoData.data.photo.childImageSharp.fluid.src
    const {getAllByTitle} = render(
      <Photo path={path} data={photoData.data} pageContext={pageContext}/>
    )
    const expected = pathToFileTitle(path)
    expect(getAllByTitle(expected).length).toBe(2)
  })
  it('passes decoded url to child components', () => {
    const pageContext = {basePath: '/'}
    const path = '/san-sebasti%c3%a1n/san-sebasti%c3%a1n.jpg'  
    const {getAllByTestId} = render(
      <Photo path={path} data={photoData.data} pageContext={pageContext}/>
    )
    expect(getAllByTestId('/san-sebastián/san-sebastián.jpg').length).toBe(1)
  })
  it('passes path to child components without pathPrefix config variable', () => {
    const pageContext = {basePath: '/'}
    const path = '/path-prefix/top-level/file.jpg'  
    const {getAllByTestId} = render(
      <Photo path={path} data={photoData.data} pageContext={pageContext}/>
    )
    expect(getAllByTestId('/top-level/file.jpg').length).toBe(1)
  })
})