const { useState } = React

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { AddReview } from './cmps/AddReview.jsx'

const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
// const Router = ReactRouterDOM.BrowserRouter

export function RootCmp() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<BookIndex />} />

            <Route path="/book/:bookId" element={<BookDetails />}>
              <Route path="/book/:bookId/addReview" element={<AddReview />} />
            </Route>

            <Route path="/book/edit" element={<BookEdit />} />

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </main>
      </section>
    </Router>
  )
}
