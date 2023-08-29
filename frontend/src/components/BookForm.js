import { useState } from "react"
import { useBooksContext } from "../hooks/useBooksContext"
import { useAuthContext } from "../hooks/useAuthContext"

const BookForm = () => {
  const { dispatch } = useBooksContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [author, setAuthor] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in to add a book')
      return
    }

    const book = {title, isbn, author, image}

    const response = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setIsbn('')
      setAuthor('')
      setImage('')
      setError(null)
      setEmptyFields([])
      console.log('new book added', json)
      dispatch({type: 'CREATE_BOOK', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Добавить книгу</h3>

      <label>Название:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>ISBN:</label>
      <input 
        type="number"
        onChange={(e) => setIsbn(e.target.value)}
        value={isbn}
        className={emptyFields.includes('isbn') ? 'error' : ''}
      />

      <label>Автор:</label>
      <input 
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className={emptyFields.includes('author') ? 'error' : ''}
      />

      <label>Обложка:</label>
      <input 
        type="text"
        onChange={(e) => setImage(e.target.value)}
        value={image}
        className={emptyFields.includes('image') ? 'error' : ''}
      />

      <button>Добавить книгу</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default BookForm