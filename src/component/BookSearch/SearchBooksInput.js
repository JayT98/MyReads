import React, { useState } from "react";

const SearchBookInput = (props) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        setValue(event.target.value);
        props.onSearch(event.target.value);
    }

    return (
        <div className="search-books-input-wrapper">
            <input
                type="text"
                value= {value}
                placeholder="Search by title, author, or ISBN"
                onChange={handleChange}
                autoFocus
            />
        </div>
    );
}


export default SearchBookInput;