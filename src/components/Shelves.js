import React from 'react'
import Book from './Book'

function Shelves({ title, books, changeShelf, currentShelf }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} changeShelf={changeShelf} currentShelf={book.shelf} />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Shelves