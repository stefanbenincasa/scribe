function Note(record_id = null, title = null, subtitle = null, body = null, author = null, favourite = null) {
  this.record_id = record_id;
  this.title = title;
  this.subtitle = subtitle;
  this.body = body;
  this.author = author;
  this.favourite = favourite;
}

module.exports = Note