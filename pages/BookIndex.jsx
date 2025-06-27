import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'
import { BookEdit } from './BookEdit.jsx'

const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet ,useSearchParams} = ReactRouterDOM

export function BookIndex() {


  const [books, setBooks] = useState(null)
  const [selecedtBookId, setSelecedtBookId] = useState(null)
  const [searchParams,setSearchParams]=useSearchParams()

  const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))

  useEffect(() => {
    setSearchParams(filterBy)
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((books) => {
      // if no books, still show the filter cmps

      setBooks(books)
    })
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function onSelectBook(bookId) {
    setSelecedtBookId(bookId)
  }

  if (!books ) return <div> Loading..</div>


  return (
    <section>
      {selecedtBookId && <BookDetails bookId={selecedtBookId} onBack={setSelecedtBookId} />}

      {!selecedtBookId && (
        <section>
          <Link to="/book/edit">
            <button>Add</button>
          </Link>
          <Link to="/book/AddGoogleBook">
            <button>Add Google Book</button>
          </Link>
          <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />
          <BookList books={books} onSelectBook={onSelectBook} />
        </section>
      )}
       {!selecedtBookId & books.length===0 && (
        <section>
          No books were found...
        </section>
      )}
    </section>
  )
}
