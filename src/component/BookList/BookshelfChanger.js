import React, {useState} from "react";

const BookshelfChanger = (props) => {
    const [value, setValue] = useState(props.shelf);

    const handleChange = (event) => {
        event.preventDefault();
        setValue(event.target.value);
        props.onMove(props.book, event.target.value);
    };

    return (
        <div className="book-shelf-changer">
            <select value={value} onChange={handleChange}>
                <option value="none" disabled>
                Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
}

export default BookshelfChanger;