import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup, render} from '@testing-library/react'
import Folders from '../../src/components/Folders'
import {objectArrayToPropArray} from '../../src/util/ramda-utils'
import folderData from '../../test-data/source-filesystem-folder-data'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const folders = objectArrayToPropArray('url', folderData.folders.nodes)
const icon =folderData.folderIcon.childImageSharp.fixed

describe('Folders', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Folders path='/base/level-one' folders={folders} icon={icon} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('displays the correct number of folder icons', () => {
    const folders = [
      '/base/level-one/level-two',
      '/base/level-one/another-level-two',
    ]
    const {getAllByTestId} = render(
      <Folders path='/base/level-one' folders={folders} icon={icon} />
    )
    expect(getAllByTestId('folder').length).toBe(2)
  })
})