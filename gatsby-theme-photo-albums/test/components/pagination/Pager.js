import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup, render} from '@testing-library/react'
import Pager from '../../../src/components/pagination/Pager'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Pager', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Pager path='/some-path/page-2' currentPage={2} numPages={3} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('displays Previous and Next link if previous and next pages exist', () => {
    const {getByText} = render(
      <Pager path='/some-path/page-2' currentPage={2} numPages={3} />
    )
    expect(getByText('← Previous Page')).toBeTruthy()
    expect(getByText('Next Page →')).toBeTruthy()
  })
  it('only displays Next link for first page', () => {
    const {getByText, queryByText} = render(
      <Pager path='/some-path' currentPage={1} numPages={3} />
    )
    expect(queryByText('← Previous Page')).toBeNull()
    expect(getByText('Next Page →')).toBeTruthy()
  })
  it('only displays Previous link for first page', () => {
    const {getByText, queryByText} = render(
      <Pager path='/some-path/page-3' currentPage={3} numPages={3} />
    )
    expect(getByText('← Previous Page')).toBeTruthy()
    expect(queryByText('Next Page →')).toBeNull()
  })
})
