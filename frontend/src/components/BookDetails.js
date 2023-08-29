import { useBooksContext } from '../hooks/useBooksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import React, { useState } from 'react'
import BookEditForm from '../pages/BookEditForm'
import { useNavigate } from 'react-router-dom'


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BookDetails = ({ book }) => {
  const { dispatch } = useBooksContext()
  const { user } = useAuthContext()
  const [isEditMode, setEditMode] = useState(false)
  const [updatedBook, setUpdatedBook] = useState({
    isbn: book.isbn,
    title: book.title,
    author: book.author,
    image: book.image
  })
  const navigate = useNavigate()

  const handleDeleteClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/books/' + book._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_BOOK', payload: json })
      navigate('/')
    }
  }

  const handleEditClick = () => {
   if (! isEditMode) {
    // setEditMode(true)
    setUpdatedBook({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      image: book.image
    })
  }
  setEditMode(!isEditMode)
}
  const handleSaveClick = async (updatedBook) => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/books/' + book._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(updatedBook)
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_BOOK', payload: json });
      // navigate('/');
      setEditMode(false)

      const updatedBookDetails = {...book, ...updatedBook }
      dispatch({ type: 'UPDATE_BOOK', payload: updatedBookDetails })
    }
  };

  if (isEditMode) {
    return (
      <BookEditForm
        book={updatedBook}
        onSave={handleSaveClick}
        onCancel={() => setEditMode(false)}
      />
    );
  }

 

  return (
    <div className="book-details">

      <img src={book.image} alt={book.title} />
      <h4>{book.title}</h4>
      <p><strong>ISBN: </strong>{book.isbn}</p>
      <p><strong>Автор: </strong>{book.author}</p>
      <p>Добавлена: {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</p>
      <button className="material-symbols-outlined" onClick={handleDeleteClick}>delete</button>
      <button className="material-symbols-outlined" onClick={handleEditClick}>update</button>

    </div >
  )
}

export default BookDetails