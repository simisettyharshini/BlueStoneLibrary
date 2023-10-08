const express = require('express');
const router = express.Router();
const Book = require('../models/booksModel.jsx');
const Rating = require('../models/ratingsModel.jsx');

// Submit rating and review for a book
router.post('/books/:bookId/ratings', async (req, res) => {
  const { rating, review } = req.body;
  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(id);
    book.ratings.push({ rating, review });
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
