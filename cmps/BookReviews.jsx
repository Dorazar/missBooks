const { useRef, useEffect, useState, Fragment } = React

export function BookReviews({ reviews, loadBook }) {
  
    useEffect(() => {
    loadBook()
  }, [reviews])

  return (
    <section>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.fullName} {review.rating} {review.readAt}
          </li>
        ))}
      </ul>
    </section>
  )
}
