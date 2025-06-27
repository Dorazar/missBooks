import { utilService } from "../services/util.service.js"

const { useRef, useEffect, useState, Fragment } = React

export function BookPreview({ book }) {

  const imgRef = useRef()



  function onHover() {

    utilService.animateCSS(imgRef.current,'pulse')
   
  }

  return (
    <article className="book-preview">
      <h4>{book.title}</h4>
      <img onMouseOver={onHover} ref={imgRef} src={book.thumbnail} alt="" />
      {/* {book.listPrice.amount} */}
      {/* {book.listPrice.currencyCode} */}
    </article>
  )
}
