const Book = require('../models/bookModel');

async function bookIDMiddleware(req, res, next, bookID) {
  try {
    const book = await Book.findById(bookID);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    req.book = book;
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}

module.exports = bookIDMiddleware;
