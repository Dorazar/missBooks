const { useRef, useEffect, useState, Fragment } = React

export function LongTxt({ txt}) {

const [lengthTxt,setLetngthTxt] = useState(100)

function onToggleLength() {
    if (lengthTxt===100) {
        setLetngthTxt(txt.length)
    }
    else setLetngthTxt(100)
}
const moreLess = lengthTxt===100 ? 'Read more...' : 'Less'
  return (
    <section>
      <a>{txt.slice(0,lengthTxt)}</a>
        <button className='more-less-btn' onClick={onToggleLength}>{moreLess}</button>
    </section>
  )
}
