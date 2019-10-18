import React from "react"
import renderer from "react-test-renderer"
import {cleanup, render} from '@testing-library/react';
import Folder from "./Folder"
import imageData from '../test-data/gatsby-image-data'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Folder", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Folder path='/folder-name' imageData={imageData} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("displays \"title case\" text for folder name", () => {
    const {getByText} = render(
      <Folder path='/first-dir/second-dir/folder-name' imageData={imageData} />
    );
    expect(getByText('Folder Name')).toBeTruthy()
  })
})

export default imageData