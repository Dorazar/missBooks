import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'

const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

  const { title, listPrice } = bookToEdit

  const navigate = useNavigate()
  function onSaveBook(ev) {
    ev.preventDefault()
    bookService
      .save(bookToEdit)
      .then(() => {
        navigate('/book')
      })
      .catch((err) => console.log('err:', err))
  }

  function handleChange({ target }) {
    const feild = target.name
    const value = target.value

    console.log(feild, value)

    switch (target.type) {
      case 'number':
        value = +value
        break

      default:
        break
    }

    if (feild === 'amount') {
      const newListPrice = { ...bookToEdit.listPrice, amount: value }
      setBookToEdit((prevBookEdit) => ({ ...prevBookEdit, listPrice: newListPrice }))
    } else {
      setBookToEdit((prevBookEdit) => ({ ...prevBookEdit, [feild]: value }))
    }
  }

  return (
    <section>
      <h1>Add Book</h1>
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">Title</label>
        <input onChange={handleChange} value={title} type="text" name="title" />

        <label htmlFor="amount">Price</label>
        <input onChange={handleChange} value={listPrice.amount} type="nubmer" name="amount" />

        <button>Add</button>
      </form>
    </section>
  )
}
