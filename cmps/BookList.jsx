import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onSelectBook }) {
  return (
    <article>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id}>
            <BookPreview book={book} />
            {/* prettier-ignore */}
            <button onClick={()=>onSelectBook(book.id)}>Details</button>
          </li>
        ))}
      </ul>
    </article>
  )
}
