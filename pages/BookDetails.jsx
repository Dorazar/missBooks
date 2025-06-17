import { bookService } from '../services/book.service.js'
const { useRef, useEffect, useState, Fragment } = React

export function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => {
        setBook(book)
        console.log(book)
      })
      .catch((err) => console.log(err))
  }

  function getPageCount() {
    if (book.pageCount >= 500) return 'Serious Reading'
    if (book.pageCount >= 200 && book.pageCount < 500) return 'Descent Reading'
    if (book.pageCount < 100) return 'Light Reading'
  }

  function getPublishedDate() {
    // if (book.publishedDate) return 1
    const currYear = new Date()

    const bookCategory = currYear.getFullYear() - book.publishedDate > 10 ? 'Vitange' : 'New'
    return bookCategory
  }

  function getPriceColor() {
    if (book.listPrice.amount >= 150) return 'red'
    if (book.listPrice.amount <= 20) return 'green'
  }

  if (!book) return <div>Loading...</div>

  return (
    <section className="book-details">
      <h1>{book.title}</h1>
      <h2>{book.authors}</h2>
      <h5>{book.description}</h5>

      <img src={book.thumbnail} alt="" />
      {book.listPrice.isOnSale && <img className="sale-img" src="assets\img\sale-tag.png"></img>}
      <h5>
        <span className={getPriceColor()}>
          {book.listPrice.amount}
          {book.listPrice.currencyCode}
        </span>
      </h5>

      <h5>{`(${getPageCount()})`}</h5>
      <h5>{getPublishedDate()}</h5>
      <button onClick={() => onBack(null)}>back</button>
    </section>
  )
}
