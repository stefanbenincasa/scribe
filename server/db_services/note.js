const { query } = require('../helpers/connection')

module.exports = {
  createNote: function(columns, author) {
    // Account for the insertion of 'author' as an additional 'param'
    let columnNames, q = `INSERT INTO "Note" (`

    columnNames = Object.keys(columns).join(', ')
    q +=  `${columnNames}, author) VALUES (` 

    for(let param = 1; param <= Object.keys(columns).length + 1; param++) q += `$${param}, `
    q = q.substring(0, q.length - 2) + ") RETURNING record_id;"

    return query(q, [...Object.values(columns), author]) 
  },
  readNote: function(record_id) {
    let q = `SELECT * FROM "Note" WHERE record_id = $1;`
    return query(q, [record_id]) 
  },
  readNotes: function(author) {
    let q = `SELECT * FROM "Note" WHERE author = $1;`
    return query(q, [author]) 
  },
  updateNote: function(columns, record_id) {
    let columnNames, q = `UPDATE "Note" SET `

    columnNames = Object.keys(columns)

    let index = 0
    columnNames.forEach((name) => q += `${name} = $${++index}, `)
    q = q.substring(0, q.length - 2) + ` WHERE record_id = $${++index};`

    return query(q, [...Object.values(columns), record_id]) 
  },
  deleteNote: function(record_id) {
    let q = `DELETE FROM "Note" WHERE record_id = $1;`
    return query(q, [record_id]) 
  },
  favoriteNote: function(record_id, currentState) {
    let q, newState = currentState ? false : true 
    q = `UPDATE "Note" SET favorite = $1 WHERE record_id = $2 RETURNING *;`
    return query(q, [newState, record_id]) 
  }

}