const isNullOrEmptyValues = function(values) {
  if(Array.isArray(values)) {
    if(values.length === 0 || values.some(value => value === "" || value === null || value === undefined)) {
      return true
    } else {
      return false
    }
  }
  else {
    console.error("Parameter must be of type Array.")
    let error = new Error()
    throw error
  }
}

const hasUnauthorizedProps = function(object, unauthProps) {
  if(!Array.isArray(unauthProps)) throw new Error('Parameter must be of type Array.')
  return Object.keys(object).some(prop => unauthProps.some(unauthProp => prop === unauthProp))
}

const hasEmptyStrings = function(values) {
  if(!Array.isArray(unauthProps)) throw new Error('Parameter must be of type Array.')
  return values.some(value => value === "")
}

const removeEmptyStrings = function(object) {
  for(let prop in object) { if(object[prop] === "") delete object[prop] }
  return object
}

module.exports = { isNullOrEmptyValues, hasUnauthorizedProps, hasEmptyStrings, removeEmptyStrings }