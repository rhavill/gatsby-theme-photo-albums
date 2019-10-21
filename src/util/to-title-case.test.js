import toTitleCase from './text-utils';

describe("text-utils", () => {  
  it("replaces hyphens with space and capitalizes first letter of each word", () => {
    const text = 'one-two-three'
    const expectedText = 'One Two Three'
    expect(toTitleCase(text)).toEqual(expectedText)
  })  
})