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
exports.objectArrayToPropArray =  (property, objects) => map(prop(property), objects)
