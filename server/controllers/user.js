const UserDBServices = require('../db_services/user')
const { isNullOrEmptyValues } = require('../helpers/validation')
const { createError } = require('../helpers/error')

const loginUser = async function (req, res, next) {
  const { email, pass } = req.body
  let queryRes = await UserDBServices.readUser(email, pass)

  try {
    if(queryRes.rows.length <= 0) {
      next(createError('not found'))
			return
    }

		req.userId = queryRes.rows[0].record_id
		next()
  }
  catch (error) {
    next(error)
  }
}

const createUser = async function (req, res, next) {
  const { first_name, surname, email, pass } = req.body
  let allInputValues = [first_name, surname, email, pass]

  try { 
     if(isNullOrEmptyValues(allInputValues)) {
       next(createError('bad request'))
			 return
     } 
		
		 let queryRes = await UserDBServices.createUser(first_name, surname, email, pass)
		 if(queryRes.rows.length <= 0) {
			 next(createError())
			 return
		 }

		 req.userId = queryRes.rows[0].record_id
		 next()
  }
  catch (error) {
    next(error)
  }
}

const readUser = async function(req, res, next) {
  let allInputValues = [ req.payload.userId ]

  try {
    if(isNullOrEmptyValues(allInputValues)) {
      next(createError('bad request'))
    }
    else {
      let queryRes = await UserDBServices.readUserById(req.payload.userId)

      if(queryRes.rows.length <= 0) {
				next(createError('not found'))
				return
      }

			res.json(queryRes.rows[0])
    }
  }
  catch (error) {
    next(error)
  }
}

const patchUser = async function(req, res, next) {
  const { ...credentials } = req.body, userId = req.payload.userId
  let allInputValues = Object.values(credentials)

  try {
    if(isNullOrEmptyValues(allInputValues)) {
      next(createError('bad request'))
    }
    else {
      let queryRes

			queryRes = await UserDBServices.readUserById(userId)
			if(queryRes.rows.length <= 0) {
				next(createError('not found'))
				return
			}

			queryRes = await UserDBServices.updateUser(credentials, userId)

      res.sendStatus(204)
    }
  }
  catch (error) {
    next(error)
  }
}

const deleteUser = async function(req, res, next) {
  let allInputValues = [ req.payload.userId ]

  try {
    if(isNullOrEmptyValues(allInputValues)) {
			next(createError('bad request'))
			return
    }

		let queryRes = await UserDBServices.deleteUserById(req.payload.userId)
		res.sendStatus(204)
  }
  catch (error) {
    next(error)
  }
}


module.exports = { loginUser, createUser, readUser, patchUser, deleteUser }
