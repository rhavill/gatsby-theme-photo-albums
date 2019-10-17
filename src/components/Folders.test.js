import React from "react"
import renderer from "react-test-renderer"
import {cleanup} from '@testing-library/react';
import Folders from "./Folders"
import imageData from './Folder.test'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const directoryData = {
  folderIcon: imageData,
  folders: {
    nodes: [
      {relativePath: ''},
      {relativePath: 'level-one'},
      {relativePath: 'another-level-one'},
      {relativePath: 'yet-another-level-one'},
      {relativePath: 'level-one/level-two'},
      {relativePath: 'level-one/another-level-two'},
    ]
  }
}

describe("Folders", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Folders path='/level-one' data={directoryData} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})