import React from 'react'
import {StaticQuery} from 'gatsby'
import renderer from 'react-test-renderer'
import {cleanup, render} from '@testing-library/react'
import Index from '../pages/index'
import queryResults from '../test-data/index-page-graphql-results'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render(queryResults.data)
  )
})

describe('Index', () => {
  it('renders correctly', () => {
    const pageContext = {numPages: 1, currentPage: 1, regexFilter: '/^[^/]+$/'}
    const tree = renderer
      .create(<Index location={{pathname: '/'}} data={queryResults.data} pageContext={pageContext}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('passes decoded urls to child components', () => {
    const pageContext = {numPages: 1, currentPage: 1, regexFilter: '/^san-sebastián[^/]+$/'}
    const {getAllByTestId} = render(
      <Index location={{pathname: '/san-sebasti%c3%a1n'}} data={queryResults.data} pageContext={pageContext}/>
    )
    expect(getAllByTestId('/san-sebastián').length).toBe(1)
  })
})