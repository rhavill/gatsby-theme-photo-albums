import React from 'react'
import {cleanup, render, renderer} from '../../../src/util/test-utils'
import Menu from '../../../src/components/layout/Menu'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Menu', () => {
  const links = [
    {title: 'Home', path: '/'},
    {title: 'One', path: '/one'},
    {title: 'Two', path: '/one/two'}
  ]
  it('renders correctly', () => {
    const tree = renderer
      .create(<Menu links={links}  />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('displays "title case" text for path components', () => {
    const {getByText} = render(
      <Menu links={links}  />
    )
    expect(getByText('One')).toBeTruthy()
    expect(getByText('Two')).toBeTruthy()
  })
})
