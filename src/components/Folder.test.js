import React from "react"
import renderer from "react-test-renderer"
import {cleanup, render} from '@testing-library/react';
import Folder from "./Folder"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const imageData = {
  childImageSharp: {
    fixed: {
      width: 250,
      height: 250,
      src: '/static/hash/f17d3/folder.png',
      srcSet: '/static/hash/f17d3/folder.png 1x',
    }
  }
}

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