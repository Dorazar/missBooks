export function RateByStars({  onAddVal,onAddReview }) {
  
       function onChooseRating({target}) {
        const value = target.value
        const feild = target.name
        onAddVal(feild,value)
        console.log(feild,value)
    }
  
  
  
  
    return (
    <section>
      <h1>Rate By Stars</h1>
           <label htmlFor="rating">Rating</label>
        <select onChange={(ev)=>onChooseRating(ev)}  name="rating" type="number">
          <option value="">Select rating</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
         <button onClick={(ev)=>onAddReview(ev)}>Add</button>

    </section>
  )
}

