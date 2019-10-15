import React from "react"
import renderer from "react-test-renderer"
import {cleanup, render} from '@testing-library/react';
import Layout from "./Layout"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Layout", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Layout path="/"><div>hello</div></Layout>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("displays child nodes", () => {
    const {getByText} = render(
      <Layout path="/"><div>hello</div></Layout>
    );
    expect(getByText('hello')).toBeTruthy()
  })
})
