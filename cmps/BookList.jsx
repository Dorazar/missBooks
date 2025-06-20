import { BookPreview } from './BookPreview.jsx'


const { Link } = ReactRouterDOM

export function BookList({ books, onSelectBook }) {
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
          </li>
        ))}
      </ul>
    </article>
  )
}
