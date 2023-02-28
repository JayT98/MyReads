import "./App.css";
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { debounce } from "throttle-debounce";
import * as BooksAPI from "./BooksAPI";
import BookList from "./component/BookList/BookList";
import BookSearch from "./component/BookSearch/BookSearch"

class BooksApp extends Component {
  bookshelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Have Read" },
  ];
  
  state = {
    myBooks: [],
    searchBooks: [],
  };

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooks: books });
    });
  };

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);

    let updatedBooks = [];
    updatedBooks = this.state.myBooks.filter(b => b.id !== book.id);

    if (shelf !== "none") {
      book.shelf = shelf;
      updatedBooks = updatedBooks.concat(book);
    }

    this.setState({
      myBooks: updatedBooks,
    });
  };

  searchForBooks = debounce(300, false, (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        // console.log(books);
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  });

  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  render() {
    const { myBooks, searchBooks } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              bookshelves={this.bookshelves}
              books={myBooks}
              onMove={this.moveBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <BookSearch
              searchBooks={searchBooks}
              myBooks={myBooks}
              onSearch={this.searchForBooks}
              onMove={this.moveBook}
              onResetSearch={this.resetSearch}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
