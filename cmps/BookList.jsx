import { BookPreview } from './BookPreview.jsx'


const { Link } = ReactRouterDOM

export function BookList({ books }) {
  return (
    <article>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id}>
            <BookPreview book={book} />
            {/* prettier-ignore */}
            <button>
              <Link to={`/book/${book.id}`}>Details</Link>
            </button>
            <button>
              <Link to={`/book/edit/${book.id}`}>Edit</Link>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
