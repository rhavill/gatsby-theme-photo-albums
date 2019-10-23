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
    const pageContext = {relativePath: '1.jpg'}
    const tree = renderer
      .create(<Photo path='1.jpg' data={photoData.data} pageContext={pageContext}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('displays images with "title" attributes containing a title-case version of the photo file name', () => {
    const path = photoData.data.photo.childImageSharp.fluid.src
    const pageContext = {relativePath: path}    
    const {getAllByTitle} = render(
      <Photo path={path} data={photoData.data} pageContext={pageContext}/>
    )
    const expected = pathToFileTitle(path)
    expect(getAllByTitle(expected).length).toBe(2)
  })
})