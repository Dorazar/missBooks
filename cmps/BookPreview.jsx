export function BookPreview({ book }) {
  return (
    <React.Fragment>
      <article>
        <div>{book.title}</div>
        <div>
          {book.listPrice.amount}
          {book.listPrice.currencyCode}
        </div>
      </article>
    </React.Fragment>
  )
}
