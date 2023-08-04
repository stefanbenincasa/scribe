const { query } = require('../helpers/connection')

module.exports = {
  createUser: function(first_name, surname, email, pass) {
    let q = `
      INSERT INTO "User" (first_name, surname, email, pass)
      VALUES ($1, $2, $3, $4)
      RETURNING record_id;
    ` 
    return query(q, [first_name, surname, email, pass])
  },
  readUser: function(email, pass) {
    let q = `SELECT * FROM "User" WHERE email = $1 AND pass = $2 LIMIT 1;` 
    return query(q, [email, pass])
  },
  readUserById: function(record_id) {
    let q = `SELECT * FROM "User" WHERE record_id = $1 LIMIT 1;` 
    return query(q, [record_id])
  },
  readUsers: function() {
    let q = `SELECT * FROM "User";` 
    return query(q)
  },
  updateUser: function(credentials, record_id) {
    let q = `UPDATE "User" SET `

    let paramNum = 1
    for(prop in credentials) {
      q += `${prop} = $${paramNum}, ` 
      paramNum++
    }

    q = q.substring(0, q.length - 2); 
    q += ` WHERE record_id = $${paramNum}`;

    return query(q, [...Object.values(credentials), record_id])
  },
  deleteUserById: function(record_id) {
    let q = `DELETE FROM "User" WHERE record_id = $1;`
    return query(q, [record_id])
  }
}