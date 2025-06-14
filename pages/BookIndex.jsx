import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'

const { useRef, useEffect, useState, Fragment } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selecedtBookId, setSelecedtBookId] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    bookService.query({}).then((books) => {
      setBooks(books)
      console.log(books)
    })
  }

  function onSelectBook(bookId) {
    setSelecedtBookId(bookId)
  }

  if (!books || books.length === 0) return <div>Loading...</div>

  return (
    <section>
      {selecedtBookId && <BookDetails bookId={selecedtBookId} onBack={setSelecedtBookId} />}

      {!selecedtBookId && (
        <section>
          <BookFilter />
          <BookList books={books} onSelectBook={onSelectBook} />
        </section>
      )}
    </section>
  )
}
