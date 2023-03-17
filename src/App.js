import "./App.css";
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { debounce } from "throttle-debounce";
import * as BooksAPI from "./BooksAPI";
import BookList from "./component/BookList/BookList";
import BookSearch from "./component/BookSearch/BookSearch";

const BooksApp = () => {
    const bookshelves = [
        { key: "currentlyReading", name: "Currently Reading" },
        { key: "wantToRead", name: "Want to Read" },
        { key: "read", name: "Have Read" },
    ];

    const [myBooks, setMyBooks] = useState([]);
    const [searchBooks, setSearchBooks] = useState([]);

    useEffect(() => {
      BooksAPI.getAll().then((books) => {
        setMyBooks(books);
      });
    }, [])

    const moveBook = (book, shelf) => {
        BooksAPI.update(book, shelf);

        let updatedBooks = [];
        updatedBooks = myBooks.filter((b) => b.id !== book.id);

        if (shelf !== "none") {
            book.shelf = shelf;
            updatedBooks = updatedBooks.concat(book);
        }
        setMyBooks(
            updatedBooks
        );
    };

    const searchForBooks = debounce(300, false, (query) => {
        if (query.length > 0) {
            BooksAPI.search(query).then((books) => {
                // console.log(books);
                if (books.error) {
                    setSearchBooks([]);
                } else {
                    setSearchBooks(books);
                }
            });
        } else {
            setSearchBooks([]);
        }
    });

    const resetSearch = () => {
        setSearchBooks([]);
    };

    return (
        <div className="app">
            <Route
                exact
                path="/"
                render={() => (
                    <BookList
                        bookshelves={bookshelves}
                        books={myBooks}
                        onMove={moveBook}
                    />
                )}
            />
            <Route
                path="/search"
                render={() => (
                    <BookSearch
                        searchBooks={searchBooks}
                        myBooks={myBooks}
                        onSearch={searchForBooks}
                        onMove={moveBook}
                        onResetSearch={resetSearch}
                    />
                )}
            />
        </div>
    );
};

export default BooksApp;
