const NoteDBServices = require('../db_services/note')

const { isNullOrEmptyValues, hasUnauthorizedProps, removeEmptyStrings, hasEmptyStrings } = require('../helpers/validation')
const { createError } = require('../helpers/error')

const createNote = async function (req, res, next) {
  try { 
		if(isNullOrEmptyValues(Object.values(req.body)) || hasUnauthorizedProps(req.body, ["record_id", "author"])) {
			next(createError('bad request'))
			return
    } 

		let { ...note } = req.body, queryRes = await NoteDBServices.createNote(note, req.payload.userId)
		if(queryRes.rows.length <= 0) {
			next(createError())
			return
		}

		queryRes = await NoteDBServices.readNote(queryRes.rows[0].record_id)
		res.status(201).json(queryRes.rows[0])
  }
  catch (error) {
    next(error)
  }
}

const readNote = async function (req, res, next) {
  const record_id = req.params.noteId
  let allInputValues = [ record_id, req.payload.userId ]

  try { 
    if(isNullOrEmptyValues(allInputValues)) {
			next(createError('bad request'))
			return
    } 

		let queryRes = await NoteDBServices.readNote(record_id)
		if(queryRes.rows.length <= 0) {
			next(createError('not found'))
			return
		}
		if(queryRes.rows[0].author !== req.payload.userId) {
			next(createError('unauthorized'))
			return
		}

		res.json(queryRes.rows[0])
  }
  catch (error) {
    next(error)
  }
}

const readNotes = async function (req, res, next) {
  let allInputValues = [ req.payload.userId ]

  try { 
    if(isNullOrEmptyValues(allInputValues)) {
			next(createError('bad request'))
			return
    } 

		let queryRes = await NoteDBServices.readNotes(req.payload.userId)
		if(queryRes.rows.length <= 0) {
			next(createError('not found'))
			return
		}

		res.json(queryRes.rows)
  }
  catch (error) {
    next(error)
  }
}

const patchNote = async function (req, res, next) {
  const { ...columns } = req.body
	const record_id = req.params.noteId
  let allInputValues = [ Object.values(columns), record_id ].flat()

  try { 
    if(isNullOrEmptyValues(allInputValues) || hasUnauthorizedProps(req.body, ["record_id", "author"])) {
			next(createError('bad request'))
			return
    } 

		let queryRes 

		queryRes = await NoteDBServices.readNote(record_id)
		if(queryRes.rows.length <= 0) {
			next(createError('not found'))
			return
		}
		if(queryRes.rows[0].author !== req.payload.userId) {
			next(createError('unauthorized'))
			return
		}

		queryRes = await NoteDBServices.updateNote(columns, record_id)
		queryRes = await NoteDBServices.readNote(record_id)
		res.status(200).json(queryRes.rows[0])
  }
  catch (error) {
    next(error)
  }
}

const deleteNote = async function (req, res, next) {
  const record_id = req.params.noteId
  let allInputValues = [ record_id ]

  try { 
    if(isNullOrEmptyValues(allInputValues)) {
			next(createError('bad request'))
			return
    } 

    else { 
      let queryRes 

			queryRes = await NoteDBServices.readNote(record_id)
      if(queryRes.rows.length <= 0) {
				next(createError('not found'))
				return
			}
			if(queryRes.rows[0].author !== req.payload.userId) {
				next(createError('unauthorized'))
				return 
			}

			queryRes = await NoteDBServices.deleteNote(record_id)
			res.sendStatus(204)
    }
  }
  catch (error) {
    next(error)
  }
}

const favoriteNote = async function (req, res, next) {
	const record_id = req.params.noteId
  let allInputValues = [ record_id ]

  try { 
    if(isNullOrEmptyValues(allInputValues)) {
			next(createError('bad request'))
			return
    } 

		let queryRes 

		queryRes = await NoteDBServices.readNote(record_id)
		if(queryRes.rows.length <= 0) {
			next(createError('not found'))
			return
		}
		if(queryRes.rows[0].author !== req.payload.userId) {
			next(createError('unauthorized'))
			return
		}

		queryRes = await NoteDBServices.favoriteNote(record_id, queryRes.rows[0].favorite)
		res.status(200).json(queryRes.rows[0])
  }
  catch (error) {
    next(error)
  } 
}

module.exports = { createNote, readNote, readNotes, patchNote, deleteNote, favoriteNote }
