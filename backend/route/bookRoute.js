const express = require('express');
const bookRouter = express.Router();

const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('./../controller/bookController');

bookRouter.route('/').get(getAllBooks).post(createBook);
bookRouter.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports = bookRouter;
