const express = require('express');
const router = express.Router();
const booksController = require('../controllers/bookscontroller');
const bookIDMiddleware = require('../middleware/bookIDMiddleware');

router.route('/books')
  .get(booksController.get)
  .post(booksController.post);

router.param('bookID', bookIDMiddleware);
router.route('/books/:bookID')
  .get(booksController.getBook)
  .put(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = router;
