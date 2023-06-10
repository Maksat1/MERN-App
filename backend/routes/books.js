const express = require('express')
const {
  getAllBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook
} = require('../controllers/bookController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all books
router.get('/', getAllBooks)

//GET a single book
router.get('/:id', getBook)

// POST a new book
router.post('/', addBook)

// DELETE a book
router.delete('/:id', deleteBook)

// UPDATE a book
router.patch('/:id', updateBook)


module.exports = router