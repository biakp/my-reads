import React from 'react'
import { Link } from 'react-router-dom'
import Shelves from './Shelves'
import * as BooksAPI from "../BooksAPI"
import sortBy from 'sort-by' //https://www.npmjs.com/package/sort-by
import { DebounceInput } from 'react-debounce-input' //https://www.npmjs.com/package/react-debounce-input

class Search extends React.PureComponent {

  state = {
    shelfBooks: [],
    searchedBooks: [],
    query: '',
    error: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ shelfBooks: books})
      })
  }

  search = (e) => {
    this.setState({ query: e.target.value })

    if (this.state.query) {
      BooksAPI.search(this.state.query, 25).then( books => {
        const searchResults = books.map( searched => {
          const index = this.state.shelfBooks.find(book => {
            return book.id === searched.id
          })
          if (index !== undefined) {
            return index
          } else {
            return {...searched, shelf:'none'}
          }
        })
        return searchResults
      }).then(searchedBooks => {
        this.setState({
          searchedBooks
        })
      }).catch(() => {
        this.setState({
          searchedBooks: []
        })
      })
    }
  }

  render() {

    const { searchedBooks } = this.state

    searchedBooks.sort(sortBy('title', 'author')) // https://www.npmjs.com/package/sort-by

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              type="text"
              placeholder="Search by title or author"
              debounceTimeout={300}
              onChange={this.search} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          <Shelves
                title="Results"
                books={searchedBooks}
                changeShelf={this.props.onShelfSelect}
              />
          </ol>
        </div>
      </div>
    )
  }
}

export default Search