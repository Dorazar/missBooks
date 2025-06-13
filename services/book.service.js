import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      books = books.filter((book) => regExp.test(book.title))
    }
    if (filterBy.listPrice) {
      books = books.filter((book) => book.listPrice >= filterBy.listPrice)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(title = '', listPrice = { amount: '', currencyCode: '', isOnSale: '' }) {
  return {
    title,
    listPrice,
  }
}

function getDefaultFilter() {
  return { title: '', listPrice }
}

function _createBooks() {
  let books = loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = [
      _createBook('haary potter', { amount: 50, currencyCode: 'usd', isOnSale: true }),
      _createBook('batman', { amount: 120, currencyCode: 'usd', isOnSale: true }),
      _createBook('wolverine', { amount: 150, currencyCode: 'usd', isOnSale: true }),
      _createBook('hulk', { amount: 140, currencyCode: 'usd', isOnSale: true }),
    ]
    saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, listPrice) {
  const book = getEmptyBook(title, listPrice)
  book.id = makeId()
  return book
}