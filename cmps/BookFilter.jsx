export function BookFilter() {
  return (
    <form>
      <label htmlFor="txt"  name="txt">Title</label>
      <input type="text"  name="txt" />

      <label htmlFor="amount"  name="amount">amount</label>
      <input type="number" name="amount" />
    </form>
  )
}
