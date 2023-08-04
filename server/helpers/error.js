const createError = function(type) {
	let error = new Error()
	error.type = type
	return error
}

module.exports = { createError }
