const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,

  pageCount: Number,
  imageUrl: String,
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
