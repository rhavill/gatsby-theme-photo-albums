import React from "react"
import {StaticQuery} from 'gatsby'
import renderer from "react-test-renderer"
import {cleanup} from '@testing-library/react';
import Index from "../pages/index"
import queryResults from '../test-data/index-page-graphql-results'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);
beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render(queryResults.data)
  )
})

describe("Index", () => {
  it("renders correctly", () => {
    const pageContext = {numPages: 1, currentPage: 1}
    const tree = renderer
      .create(<Index location={{pathname: '/'}} data={queryResults.data} pageContext={pageContext}/>)
      .toJSON()
      expect(tree).toMatchSnapshot()
    })

})