import {toTitleCase, pathToFileTitle, removeFileExtension, 
  ensureLeadingAndTrailingSlash
} from '../../src/util/url-text'

describe('url-text', () => {  
  it('replaces hyphens and underscores with space and capitalizes first letter of each word', () => {
    const text = 'one-two_three'
    const expectedText = 'One Two Three'
    expect(toTitleCase(text)).toEqual(expectedText)
  })
  it('removes a file extension from a file (or relative path)', () => {
    const path = 'level-one/level-two/level-three/my-picture.jpg'
    const expected = 'level-one/level-two/level-three/my-picture'
    expect(removeFileExtension(path)).toEqual(expected)
  })
  it('converts the relativePath of a file to a title-case title', () => {
    const path = 'level-one/level-two/level-three/my-picture.jpg'
    const expected = 'My Picture'
    expect(pathToFileTitle(path)).toEqual(expected)
  })
  it('ensureLeadingAndTrailingSlash adds slashes to a string not ending in a trailing slash', () => {
    const text = 'something'
    const expected = '/something/'
    expect(ensureLeadingAndTrailingSlash(text)).toEqual(expected)
  })
  it('ensureLeadingAndTrailingSlash does not add slash to a string starting and ending in a trailing slash', () => {
    const text = '/something/'
    const expected = '/something/'
    expect(ensureLeadingAndTrailingSlash(text)).toEqual(expected)
  })
})