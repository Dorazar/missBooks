const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

export function AddGoogleBook() {
  const [searchTerm, setSearchTerm] = useState('')

  const [gData, setGdata] = useState(searchTerm)

  function onSearchBook(searchTerm) {
    bookService.getGoogledata(searchTerm).then((books) => setGdata(books.items))
  }

  function handleChange({ target }) {
    const feild = target.name
    const value = target.value

    switch (feild.type) {
      case 'number':
        value = +value
        break
      default:
        break
    }
    setSearchTerm(value)
  }

  //   const gData =  bookService.getGoogledata().items

  function onBookChoose(book) {
    bookService.onAddGoogleBook(book).then((book) => bookService.save(book))
  }

  console.log(gData)
  return (
    <section>
      <section>
        <h1>Add a google book</h1>
        <label htmlFor="searchTerm">Book Name</label>
        <input value={searchTerm} onChange={handleChange} type="text" name="searchTerm" />
        <button type="button" onClick={() => onSearchBook(searchTerm)}>
          Search
        </button>
      </section>

      {gData && (
        <ul>
          {gData.map((book) => (
            <li key={book.id}>
              {book.volumeInfo.title}
              <button
                onClick={() => {
                  onBookChoose(book)
                }}
              >
                +
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
