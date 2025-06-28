export function RateByTextBox({  onAddVal,onAddReview } ) {
  
   function onChooseRating({target}) {
        const value = target.value
        const feild = target.name
        onAddVal(feild,value)
        console.log(feild,value)
    }
  
    return (

    
    <section>
      <h1>Rate by textbox</h1>

        <label htmlFor="rating"></label>
        <input  onChange={(ev)=>onChooseRating(ev)} type="text" name="rating" placeholder="Enter a rating" />
        <button onClick={(ev)=>onAddReview(ev)}>Add</button>


    </section>
  )
}
