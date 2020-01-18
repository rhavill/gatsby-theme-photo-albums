import {toTitleCase, pathToFile, pathToFileTitle, removeFileExtension,
  gatsbyPathnameToChildComponentPath, ensureLeadingAndTrailingSlash} from './text-utils'

describe('text-utils', () => {  
  it('replaces hyphens and underscores with space and capitalizes first letter of each word', () => {
    const text = 'one-two_three'
    const expectedText = 'One Two Three'
    expect(toTitleCase(text)).toEqual(expectedText)
  })
  it('extracts the file portion of a path', () => {
    const path = 'level-one/level-two/level-three/my-picture.jpg'
    const expected = 'my-picture.jpg'
    expect(pathToFile(path)).toEqual(expected)
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
  it('gatsbyPathnameToChildComponentPath decodes url', () => {
    const baseUrl = '/'
    const path = '/level-one/san-sebasti%c3%a1n.jpg'
    const graphqlData = {site: {pathPrefix: '/some-prefix'}}
    const expected = '/level-one/san-sebastián.jpg'
    expect(gatsbyPathnameToChildComponentPath(baseUrl, path, graphqlData)).toEqual(expected)
  })
  it('gatsbyPathnameToChildComponentPath removes pathPrefix config variable from url', () => {
    const baseUrl = '/'
    const path = '/some-prefix/level-one/my-picture.jpg'
    const graphqlData = {site: {pathPrefix: '/some-prefix'}}
    const expected = '/level-one/my-picture.jpg'
    expect(gatsbyPathnameToChildComponentPath(baseUrl, path, graphqlData)).toEqual(expected)
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