const Book = require('./../model/bookModel');
const APIFeatures = require('./../utlis/apiFeatures');

// Controller
//Get All Books
exports.getAllBooks = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Book.find({}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const books = await features.query;

    // SEND RESPONSE
    res.status(200).json(books);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
//   const books = await Book.find({});
//   res.status(200).json(books);
// } catch (err) {
//   res.status(404).json({
//     status: 'fail',
//     message: err,
//   });
// }

//Get Unique Book
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json(book);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
//Create Book
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
//Update Book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //To send back new data
      runValidators: true,
    });
    res.status(200).json({
      book,
      status: 'success',
      message: 'Updated the data',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
//Delete Book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
