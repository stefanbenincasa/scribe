function User(record_id = null, first_name = null, surname = null, email = null, pass = null) {
  this.record_id = record_id;
  this.first_name = first_name;
  this.surname = surname;
  this.email = email;
  this.pass = pass;
}

module.exports = User