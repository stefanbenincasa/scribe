const removeFalsyValues = function(object) {
  return removeEmptyStrings(removeNullValues(removeUndefinedValues(object)))
}

const removeEmptyStrings = function(object) {
  for(let prop in object) { if(object[prop] === "") delete object[prop] }
  return object
}

const removeNullValues = function(object) {
  for(let prop in object) { if(object[prop] === null) delete object[prop] }
  return object
}

const removeUndefinedValues = function(object) {
  for(let prop in object) { if(object[prop] === undefined) delete object[prop] }
  return object
}

module.exports = { removeFalsyValues, removeEmptyStrings, removeNullValues, removeUndefinedValues }