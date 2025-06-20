import { AddReview } from '../cmps/AddReview.jsx'
import { BookPreview } from '../cmps/BookPreview.jsx'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { bookService } from '../services/book.service.js'
const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM

export function BookDetails() {
  const [book, setBook] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then((book) => {
        setBook(book)
        // console.log(book)
      })
      .catch((err) => console.log(err))
  }

  function getPageCountDesc() {
    if (book.pageCount >= 500) return 'Serious Reading'
    if (book.pageCount >= 100 && book.pageCount < 500) return 'Descent Reading'
    if (book.pageCount < 100) return 'Light Reading'
  }

  function getBookGen() {
    // if (book.publishedDate) return 1
    const currYear = new Date()

    const bookGen = currYear.getFullYear() - book.publishedDate > 10 ? 'Vitange' : 'New'
    return bookGen
  }

  function getPriceClass() {
    if (book.listPrice.amount >= 150) return 'red'
    if (book.listPrice.amount <= 20) return 'green'
  }

  function onBack() {
    navigate('/book')
  }

  if (!book) return <div>Loading...</div>

  return (
    <section className="book-details">
      <h1>{book.title}</h1>
      <h2>{book.authors}</h2>
      <h5>
        <LongTxt txt={book.description} />
      </h5>

      <img src={book.thumbnail} alt="" />
      {book.listPrice.isOnSale && <img className="sale-img" src="assets\img\sale-tag.png"></img>}
      <h5>
        <span className={getPriceClass()}>
          {book.listPrice.amount}
          {book.listPrice.currencyCode}
        </span>
      </h5>

      <h5>{`(${getPageCountDesc()})`}</h5>
      <h5>{getBookGen()}</h5>
      <nav>
        <button>
          {' '}
          <Link to={`/book/${params.bookId}/addReview`}>Add review</Link>
        </button>
      </nav>
      <section>
        <Outlet />
      </section>
      <button onClick={onBack}>back</button>
    </section>
  )
}
