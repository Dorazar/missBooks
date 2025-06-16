export function BookPreview({ book }) {
  return (
    <article className="book-preview">
      <h4>{book.title}</h4>

      {book.listPrice.amount}
      {book.listPrice.currencyCode}
    </article>
  )
}
