var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = Schema(
  {
    date: { type: String, required: false },
    dateexact: { type: String, required: false },
    title: { type: String, required: false },
    article: { type: String, required: false }
  }
);

module.exports = mongoose.model('article', articleSchema);
