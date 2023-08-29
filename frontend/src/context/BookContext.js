import { createContext, useReducer } from 'react'

export const BooksContext = createContext()

export const booksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        books: action.payload
      }
    case 'CREATE_BOOK':
      return {
        books: [action.payload, ...state.books]
      }
    case 'DELETE_BOOK':
      return {
        books: state.books.filter((w) => w._id !== action.payload._id)
      }
    case 'UPDATE_BOOK':
      return {
        books: state.books.map((book) => {
          if (book._id === action.payload._id) {
            console.log('map', action.payload)
            return action.payload
          }
          console.log('updating book', book)
          return book
        })
      }
    default:
      return state
  }
}

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, {
    books: null
  })

  return (
    <BooksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BooksContext.Provider>
  )
}