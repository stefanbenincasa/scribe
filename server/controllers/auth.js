const express = require('express')
const jwt = require('jsonwebtoken')
const { isNullOrEmptyValues } = require('../helpers/validation')
const { createError } = require('../helpers/error')

function sign(req, res, next) {
  const token = jwt.sign( {userId: req.userId}, 'WL_m6beLyQ_86UYErX@6', {expiresIn: '1h'}) 
	res.json({token: token})
}

function authorise(req, res, next) {
  try {
    let token, authToken = req.headers.authorization

    if(isNullOrEmptyValues([authToken]) || authToken.split('Bearer').length <= 1) {
      next(createError('bad request'))
			return
    } 

		token = authToken.split('Bearer')[1].trim()
    jwt.verify(token, 'WL_m6beLyQ_86UYErX@6', function(error, payload) {
      if(error) {
				next(createError('unauthorized'))
				return
      } 

			req.payload = payload
			next() 
    })
  }
  catch (error) {
    next(error)
  }
}

module.exports = { 
  sign,
  authorise 
}
