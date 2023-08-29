import React, { useState } from 'react'

const BookEditForm = ({ book, onSave, onCancel }) => {
  const [isbn, setISBN] = useState(book.isbn)
  const [title, setTitle] = useState(book.title)
  const [author, setAuthor] = useState(book.author)
  const [image, setImage] = useState(book.image)

  const handleSave = () => {
    onSave({
    
      isbn: isbn,
      title: title,
      author: author,
      image: image
    })
  }

  return (
    <div className="book-edit-form">
      <h2>Edit Book</h2>
      <label>
        ISBN:
        <input type="text" value={isbn} onChange={e => setISBN(e.target.value)} />
      </label>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        Author:
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </label>
      <label>
        Image:
        <input type="text" value={image} onChange={e => setImage(e.target.value)} />
      </label>
      <div className="button-group">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default BookEditForm
