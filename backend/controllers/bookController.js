const Book = require('../models/bookModel')
const mongoose = require('mongoose')

// get all books
const getAllBooks = async (req, res) => {
  const books = await Book.find({})
    res.status(200).json(books)
}

// get a single book
const getBook = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such book' })
  }

  const book = await Book.findById(id)

  if (!book) {
    return res.status(404).json({ error: 'No such book' })
  }

  res.status(200).json(book)
}


// create new book
const addBook = async (req, res) => {
  const { isbn, title, author, image } = req.body

  let emptyFields = []

  if (!isbn) {
    emptyFields.push('isbn')
  }
  if (!title) {
    emptyFields.push('title')
  }
  if (!author) {
    emptyFields.push('author')
  }
  if (!image) {
    emptyFields.push('image')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const book = await Book.create({ isbn, title, author, image })
    res.status(200).json(book)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such book' })
  }

  const book = await Book.findOneAndDelete({ _id: id })

  if (!book) {
    return res.status(400).json({ error: 'No such book' })
  }

  res.status(200).json(book)
}

// update a book
const updateBook = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such book' })
  }

  const book = await Book.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!book) {
    return res.status(400).json({ error: 'No such book' })
  }

  res.status(200).json(book)
}


module.exports = {
  getAllBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook
}