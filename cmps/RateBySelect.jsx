export function RateBySelect({ onAddVal,onAddReview }) {
  
  
    function onChooseRating({target}) {
        const value = target.value
        const feild = target.name
        onAddVal(feild,value)
        
    }
  
  
  
    return (
    <section>
      <h1>Rate by select </h1>
      <select name="rating" onChange={(ev)=>onChooseRating(ev)}>
        <option value="">Select rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
       
      </select>
       <button onClick={(ev)=>onAddReview(ev)}>Add</button>
    </section>
  )
}
