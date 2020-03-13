import photoDimensions from '../../src/util/photo-dimensions'

describe('photo-paths', () => {  
  it('shrinks image height to match screen height with landscape screen and image taller than screen height', () => {
    const windowDimensions = {
      orientation: 'landscape',
      width: 800,
      height: 400
    }
    const pageContext = {
      width: 1024,
      height: 768 
    }
    const expected = {
      maxWidth: 533.333,
      maxHeight: 400 
    }
    const dimensions = photoDimensions(windowDimensions, pageContext)
    expect(dimensions.maxHeight).toBe(expected.maxHeight)
    expect(dimensions.maxWidth).toBeCloseTo(expected.maxWidth)
  })
  it('shrinks image width to match screen width with portrait screen and image wider than screen width', () => {
    const windowDimensions = {
      orientation: 'portrait',
      width: 400,
      height: 800
    }
    const pageContext = {
      width: 1024,
      height: 768 
    }
    const expected = {
      maxWidth: 400,
      maxHeight: 300
    }
    const dimensions = photoDimensions(windowDimensions, pageContext)
    expect(dimensions.maxHeight).toBeCloseTo(expected.maxHeight)
    expect(dimensions.maxWidth).toBe(expected.maxWidth)
  })  
  it('shrinks image height to match screen height when image is wider and taller than screen, excess image width is greater than excess height and excess height percentage is greater than excess width percentage', () => {
    const windowDimensions = {
      width: 505,
      height: 256
    }
    const pageContext = {
      width: 1024,
      height: 768 
    }
    const expected = {
      maxWidth: 341.3333,
      maxHeight: 256
    }
    const dimensions = photoDimensions(windowDimensions, pageContext)
    expect(dimensions.maxHeight).toBe(expected.maxHeight)
    expect(dimensions.maxWidth).toBeCloseTo(expected.maxWidth)
  })
})