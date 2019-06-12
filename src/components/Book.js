import React from 'react'
import StarRatingComponent from 'react-star-rating-component' // https://www.npmjs.com/package/react-star-rating-component

class Book extends React.PureComponent {
  state = {
    rating: 1,
  };
  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  render() {
    const { book, changeShelf } = this.props
    const { rating } = this.state;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              // Get book thumbnail
              style={{
                width: 130, height: 195,
                backgroundImage: book.imageLinks ? (`url(${book.imageLinks.thumbnail})`) : (`url(http://placekitten.com/g/125/195)`)
              }}>
            </div>
            <div className="book-shelf-changer">
              <select id={book.id} value={this.props.currentShelf} onChange={changeShelf}>
                <option disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </div>
      </li>
    )
  }
}

export default Book