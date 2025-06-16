import { bookService } from '../services/book.service.js'
const { useRef, useEffect, useState, Fragment } = React

export function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadCar()
  }, [])

  function loadCar() {
    bookService
      .get(bookId)
      .then((book) => {setBook(book)
        console.log(book)
      })
      .catch((err) => console.log(err))
  }

if (!book) return <div>Loading...</div>

  return (
    <section className="book-details">
      <h1>{book.title}</h1>
      <h5>Price:{book.listPrice.amount}</h5>
      <button onClick={() => onBack(null)}>back</button>
    </section>
  )
}
