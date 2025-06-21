const { useRef, useEffect, useState, Fragment } = React

export function BookReviews({ reviews, onDeleteReview }) {
  return (
    <section>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.fullName} {review.rating} {review.readAt}
            <button onClick={() => onDeleteReview(`${review.id}`)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
