const Book = require('../models/bookModel');

function booksController() {
  const bookSchemaKeys = Object.keys(Book.schema.paths);

  async function get(req, res) {
    const { query } = req;
    const queryFields = Object.keys(query);
    const invalidFields = queryFields.filter((field) => !bookSchemaKeys.includes(field));

    if (invalidFields.length > 0) {
      const errorMessage = `Invalid fields in query: ${invalidFields.join(', ')}`;
      return res.status(400).send(errorMessage);
    }

    try {
      const books = await Book.find(query);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function post(req, res) {
    const newBook = new Book(req.body);
    try {
      const savedBook = await newBook.save();
      res.status(201).json(savedBook); // Send the saved book data in the response
    }
    catch (err) {
      res.status(500).send(err);
    }
  }

  async function getBook(req, res) {
    res.json(req.book);
  }

  async function updateBook(req, res) {
    try {
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach((element) => {
        const key = element[0];
        const value = element[1];
        req.book[key] = value;
      });
      await req.book.save();
      res.json(req.book);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function deleteBook(req, res) {
    try {
      await Book.deleteOne({ _id: req.params.bookID });
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  return {
    get,
    post,
    getBook,
    updateBook,
    deleteBook,
  };
}


module.exports = booksController();
