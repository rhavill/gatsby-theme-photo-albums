import {objectArrayToPropArray} from './ramda-utils'

describe('ramda-utils', () => {
  it('extracts a single property from an array of objects', () => {
    const objects = [{name: 'Hilda', age: 33}, {name: 'José', age: 45}]
    const expected = ['Hilda', 'José']
    expect(objectArrayToPropArray('name', objects)).toEqual(expected)
  })  
})
