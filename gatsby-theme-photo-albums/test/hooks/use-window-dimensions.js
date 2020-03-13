import {renderHook} from '@testing-library/react-hooks'
import useWindowDimensions from '../../src/hooks/use-window-dimensions'

describe('use window dimensions', () => {
  it('returns correct dimensions after window resize', () => {
    const expected = {width: 600, height: 800, orientation: 'portrait'}
    global.window.resizeTo(600, 800)
    const {result} = renderHook(() => useWindowDimensions())
    expect(result.current).toEqual(expected)
  })
})
