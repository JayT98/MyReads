import React, { Component } from "react";

class SearchBookInput extends Component {
    constructor(){
        super();
        this.state = {
            value: "",
        };
    }
    handleChange = (event) => {
        const val = event.target.value;
        this.setState({ value: val }, () => {
        this.props.onSearch(val);
    });
};

    render() {
        return (
        <div className="search-books-input-wrapper">
            <input
                type="text"
                value={this.state.value}
                placeholder="Search by title, author, or ISBN"
                onChange={this.handleChange}
                autoFocus
            />
        </div>
        );
    }
}

export default SearchBookInput;