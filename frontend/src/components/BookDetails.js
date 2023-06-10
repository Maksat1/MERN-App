import { useBooksContext } from '../hooks/useBooksContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BookDetails = ({ book }) => {
  const { dispatch } = useBooksContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
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
      dispatch({type: 'DELETE_BOOK', payload: json})
    }
  }

  return (
    <div className="book-details">
      <img src={book.image} alt={book.title} />
      <h4>{book.title}</h4>
      <p><strong>ISBN: </strong>{book.isbn}</p>
      <p><strong>Автор: </strong>{book.author}</p>
      <p>Добавлена: {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</p>
      <button className="material-symbols-outlined" onClick={handleClick}>delete</button>
    </div>
  )
}

export default BookDetails