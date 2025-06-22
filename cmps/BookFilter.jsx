const { useRef, useEffect, useState, Fragment } = React

export function BookFilter({ defaultFilter, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

  const { title, amount } = defaultFilter

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handelChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
        value = +value
        break
      case 'checkbox':
        value = value.checked

      default:
        break
    }

    setFilterByToEdit((prvFilter) => ({ ...prvFilter, [field]: value }))
    
  }

  // console.log(filterByToEdit)

  return (
    <section className="book-filter">
      <form>
        <label htmlFor="txt" name="txt">
          Title
        </label>
        <input onChange={handelChange} value={title} type="text" name="txt" />

        <label htmlFor="amount" name="amount">
          amount
        </label>
        <input onChange={handelChange} value={amount} type="number" name="amount" />
      </form>
    </section>
  )
}
