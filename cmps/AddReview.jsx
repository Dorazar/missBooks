import { bookService } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'

const { useRef, useEffect, useState, Fragment } = React
const { useParams, useNavigate } = ReactRouterDOM

export function AddReview() {
  const params = useParams()

  const navigate = useNavigate()

  function onSubmit(ev) {
    ev.preventDefault()
    const review = bookService.getEmptyReview()
    console.log(review)


    
  }

  function closeReview() {
    navigate(`/book/${params.bookId}`)
  }

  return (
    <section>
      <h1>Add review</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="fullname">Name</label>
        <input type="text" name="fullname" />

        <label htmlFor="rating">Rating</label>
        <select defaultValue={'5'} name="rating" type="number">
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>

        <label htmlFor="readAt">Date</label>
        <input defaultValue={new Date().toISOString().split('T')[0]} type="date" name="readAt" />

        <button>Add</button>
      </form>
    </section>
  )
}
