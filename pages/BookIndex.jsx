import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'

const { useRef, useEffect, useState, Fragment } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    bookService.query().then((books) => {
      setBooks(books)
      console.log(books)
    })
  }

  if (!books || books.length === 0) return 'Loading...'

  return (
    <section>
      <BookFilter />
      <BookList books={books} />
    </section>
  )
}
