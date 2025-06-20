export function AddReview() {
    

    return (
      <section>
        <h1>Add reviews</h1>
        <form>
          <label htmlFor="fullname">Name</label>
          <input type="text" name="fullname" />

          <label htmlFor="rating">Rating</label>
          <select value="5" name="rating" type="number">
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>

          <label htmlFor="readAt">Date</label>
          <input defaultValue={new Date().toISOString().split('T')[0]} type="date" name="readAt" />
        </form>
      </section>
    )
}