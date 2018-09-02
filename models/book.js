var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    comments: [{type: String, max: 1000}]
  }
);

BookSchema
.virtual('commentsCount')
.get(function () {
  return this.comments.length;
});

module.exports = mongoose.model('Book', BookSchema);