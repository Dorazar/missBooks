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
    <article>
      <div>Title:{book.title}</div>
      <div>Price:{book.listPrice.amount}</div>
      <button onClick={() => onBack(null)}>back</button>
    </article>
  )
}
