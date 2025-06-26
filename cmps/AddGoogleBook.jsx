const { useRef, useEffect, useState, Fragment } = React

import { showSuccessMsg } from '../services/event-bus.service.js'
import { bookService } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'

const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM



export function AddGoogleBook() {
  const [searchTerm, setSearchTerm] = useState('')
  const [gData, setGdata] = useState('')


  const onSetSearchByDebounce = useRef(utilService.debounce(onSearchBook,1000)).current


  useEffect(()=>{
    onSetSearchByDebounce(searchTerm)
  },[searchTerm])
  


  function onSearchBook(searchTerm) {
    bookService.getGoogledata(searchTerm).then((books) => setGdata(books.items))
  }

  function handleChange({ target }) {
    const feild = target.name
    const value = target.value

    switch (feild.type) {
      case 'number':
        value = +value
        break
      default:
        break
    }
    setSearchTerm(value)
  }

  //   const gData =  bookService.getGoogledata().items

  function onBookChoose(book) {
    console.log(book)
    bookService.onAddGoogleBook(book).then((book) => bookService.save(book))
  }

function onSelectBook({target}) {
  const bookId =target.value
  
 const bookToMod =  gData.find(book => book.id===bookId)
 const {id, ...book} = bookService.onAddGoogleBook(bookToMod).then(book =>save(book)).
 then(showSuccessMsg('Google Book Added!'))
}


 if (gData) console.log(gData)
  return (
    <section>
      <section>
        <h1>Add a google book</h1>
        <form onChange={()=>onSetSearchByDebounce(searchTerm)}>
        <label htmlFor="searchTerm">Book Name</label>
        <input value={searchTerm} onChange={handleChange} type="text" name="searchTerm" />
        {/* <button type="button" onClick={() => onSearchBook(searchTerm)}>
          Search
        </button> */}
        </form>
      </section>

      <section>
    
        {gData && (
          <ul>
            {gData.map((book) => (
              <li key={book.id}>
                {book.volumeInfo.title}
                <button
                  onClick={() => {
                    onBookChoose(book)
                  }}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <label htmlFor="book-select">Choose a book:</label>
        {gData && (

          <select onChange={()=>onSelectBook(ev)} name="book-select">
            <option value=""></option>
            {gData.map((book) => 
            (<option value={book.id} key={book.id}>{book.volumeInfo.title}</option>
            ))}
          </select>
        )}
      </section>
    </section>
  )
}
