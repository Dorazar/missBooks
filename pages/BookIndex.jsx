import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'

const { useRef, useEffect, useState, Fragment } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selecedtBookId, setSelecedtBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((books) => {
      setBooks(books)
    })
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, filterBy }))
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
          <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />
          <BookList books={books} onSelectBook={onSelectBook} />
        </section>
      )}
    </section>
  )
}
