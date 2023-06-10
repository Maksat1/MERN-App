import { useEffect } from 'react'
import { useBooksContext } from "../hooks/useBooksContext"
import { useAuthContext } from '../hooks/useAuthContext'

// components
import BookDetails from '../components/BookDetails'
import BookForm from '../components/BookForm'


const Home = () => {
  const { books, dispatch } = useBooksContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/books', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_BOOKS', payload: json })
      }
    }

    if (user) {
      fetchBooks()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      
        <div className='cards'>
          {books && books.map((book) => (
            <BookDetails key={book._id} book={book} />
          ))}
        </div>
      
      <div className="form">
        <BookForm />
      </div>
      
    </div>
  )
}

export default Home