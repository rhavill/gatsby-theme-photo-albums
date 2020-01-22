import {objectArrayToPropArray, groupByProp} from '../../src/util/ramda-utils'

describe('ramda-utils', () => {
  it('extracts a single property from an array of objects', () => {
    const objects = [{name: 'Hilda', age: 33}, {name: 'José', age: 45}]
    const expected = ['Hilda', 'José']
    expect(objectArrayToPropArray('name', objects)).toEqual(expected)
  })  
  it('groupByProp groups array elements by a property', () => {
    const objects = [{name: 'Hilda', age: 33}, {name: 'José', age: 45}, {name: 'Donny', age: 33}]
    const expected = {
      33: [
        {name: 'Hilda', age: 33},
        {name: 'Donny', age: 33},
      ],
      45: [
        {name: 'José', age: 45},
      ]
    }
    expect(groupByProp('age')(objects)).toEqual(expected)
  })  
})
