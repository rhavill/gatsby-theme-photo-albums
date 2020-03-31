const addIndex = require('ramda/src/addIndex')
const complement = require('ramda/src/complement')
const compose = require('ramda/src/compose')
const forEach = require('ramda/src/forEach')
const groupBy = require('ramda/src/groupBy')
const isNil = require('ramda/src/isNil')
const map = require('ramda/src/map')
const prop = require('ramda/src/prop')

/**
 * Accepts an array of objects and returns an array containing the values of a 
 * single property from each object of the input array.
 *
 * @func
 * @sig Array -> Array
 * @param {String} property The property to extract from each object of the 
 *    input array.
 * @param {Array} objects The input array containing objects.
 * @return {Array} A simple array containing values exracted from the `property` 
 *    values of the input array.
 * @example
 *
 *      const objects = [{name: 'Hilda', age: 33}, {name: 'José', age: 45}]
 *      objectArrayToPropArray('name', objects); //=> ['Hilda', 'José']
 */
const objectArrayToPropArray = (property, objects) => map(prop(property), objects)

const mapIndexed = addIndex(map)

const indexedForEach = addIndex(forEach)

const groupByProp = property => compose(groupBy, prop)(property)

const isNotNil = complement(isNil)

module.exports = {
  objectArrayToPropArray,
  mapIndexed,
  indexedForEach,
  groupByProp,
  isNotNil,
}
