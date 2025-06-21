import { bookService } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'

const { useRef, useEffect, useState, Fragment } = React
const { useParams, useNavigate, useOutletContext } = ReactRouterDOM

export function AddReview() {
  const fullNameRef = useRef(null)
  const ratingRef = useRef(null)
  const readAtRef = useRef(null)

  const params = useParams()

  const navigate = useNavigate()

  const { onAddReview } = useOutletContext()

  function onSubmit(ev) {
    ev.preventDefault()
    const review = {
      id: utilService.makeId(),
      fullName: fullNameRef.current.value,
      rating: ratingRef.current.value,
      readAt: readAtRef.current.value,
    }
    bookService.addReview(params.bookId, review).then(() => {
      onAddReview()
      closeReview()
    })
  }

  function closeReview() {
    navigate(`/book/${params.bookId}`)
  }

  return (
    <section>
      <h1>Add review</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="fullname">Name</label>
        <input ref={fullNameRef} type="text" name="fullname" />

        <label htmlFor="rating">Rating</label>
        <select ref={ratingRef} defaultValue={'5'} name="rating" type="number">
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>

        <label htmlFor="readAt">Date</label>
        <input ref={readAtRef} defaultValue={new Date().toISOString().split('T')[0]} type="date" name="readAt" />

        <button>Add</button>
        <button type="button" onClick={closeReview}>
          Close
        </button>
      </form>
    </section>
  )
}
