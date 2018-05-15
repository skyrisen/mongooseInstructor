const Instructor = require('../models/instructor');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the instructors, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {

 
};


const buildCriteria = (criteria) => {
  const query = {};
  console.log(criteria)

  if (criteria.name) {
    query.$text = { $search: criteria.name }
  }
  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    }
  }

  return query;

}