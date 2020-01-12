import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup, render} from '@testing-library/react'
import Folders from './Folders'
import folderData from '../test-data/source-filesystem-folder-data'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Folders', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Folders basePath='/' path='/level-one' data={folderData} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('displays the correct number of folder icons', () => {
    const {getAllByTestId} = render(
      <Folders basePath='/' path='/level-one' data={folderData} />
    )
    expect(getAllByTestId('folder').length).toBe(2)
  })
})