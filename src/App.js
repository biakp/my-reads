import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from "react-router-dom"
import './App.css'
import Search from './components/Search'
import Shelves from './components/Shelves'
import ReactLoading from 'react-loading' //https://www.npmjs.com/package/react-loading

class App extends React.PureComponent {
  state = {
    books: [],
    isLoading: true
  }

  // Get book info from BookAPI
  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books: books });
      })
    setTimeout(() => this.setState({ isLoading: false }), 2000);
  }

  changeShelf = (e) => {
    BooksAPI.update({ id: e.target.id }, e.target.value).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books: books })
      });
    });
  }

  render() {
    const { books } = this.state;

    if (this.state.isLoading) {
      return <ReactLoading type={'cubes'} color={'#725324'} height='20%' width='10%' />;
    }

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelves
                title="Currently Reading"
                books={books.filter((book) => book.shelf === 'currentlyReading')}
                changeShelf={this.changeShelf}
              />
              <Shelves
                title="Want To Read"
                books={books.filter((book) => book.shelf === 'wantToRead')}
                changeShelf={this.changeShelf}
              />
              <Shelves
                title="Read"
                books={books.filter((book) => book.shelf === 'read')}
                changeShelf={this.changeShelf}
              />
            </div>
            <div className="open-search">
              <Link to="/search"></Link>
            </div>
            <footer className="footer">
              <p> My Reads 2019 &copy; </p>
            </footer>
          </div>
        )} />
        <Route path='/search' render={({ history }) => (
          <Search          
          onShelfSelect={(e) => {
            this.changeShelf(e)
            history.push('/')
          }}
          />
        )}
        />
      </div>
    )
  }
}

export default App