import { bookService } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'

const { useRef, useEffect, useState, Fragment } = React
const { useParams, useNavigate } = ReactRouterDOM

export function AddReview({ onReview }) {
  const params = useParams()

  const [review, setReview] = useState(bookService.getEmptyReview())

  const navigate = useNavigate()

  function handleChange({ target }) {
    const feild = target.name
    const value = target.value

    switch (target.type) {
      case 'number':
        value = +value
        break

      case 'checkbox':
        value = target.chcked
        break
    }

    setReview((prevReview) => ({ ...prevReview, [feild]: value }))
  }

  function onAddReview(ev) {
    ev.preventDefault()
    bookService.saveReview(params.bookId, review).then(onReview)
  }

  function closeReview() {
    navigate(`/book/${params.bookId}`)
  }

  return (
    <section>
      <h1>Add review</h1>
      <form>
        <label htmlFor="fullname">Name</label>
        <input onChange={handleChange} value={review.fullname} type="text" name="fullname" />

        <label htmlFor="rating">Rating</label>
        <select onChange={handleChange} value={review.rating} name="rating" type="number">
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>

        <label htmlFor="readAt">Date</label>
        <input onChange={handleChange} value={review.readAt} type="date" name="readAt" />
        <button onClick={onAddReview}>Add</button>
      </form>
    </section>
  )
}
