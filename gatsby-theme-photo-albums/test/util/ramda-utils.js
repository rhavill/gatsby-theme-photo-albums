import {objectArrayToPropArray, groupByProp, isNotNil} from '../../src/util/ramda-utils'

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
  it('isNotNil returns false for a value that is null or undefined', () => {
    expect(isNotNil(null)).toBe(false)
    expect(isNotNil(undefined)).toBe(false)
  }) 
  it('isNotNil returns true for a value that is not null or undefined', () => {
    expect(isNotNil(3)).toBe(true)
    expect(isNotNil('a')).toBe(true)
    expect(isNotNil({a: 3})).toBe(true)
    expect(isNotNil([0])).toBe(true)
    expect(isNotNil(() => {})).toBe(true)
  })
})
