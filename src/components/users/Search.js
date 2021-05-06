import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
  };

  handleSearch = (e) => {
    // this.setState({ text: e.target.value });
    //no need to create more handler functions below will do auto
    // find name in input and according to that update value
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        {/* onSubmit={this.handleSubmit.bind(this)} -> without arrow func.*/}
        <form onSubmit={this.handleSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={this.handleSearch}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear && (
          <button
            className="btn btn-light btn-block text-center"
            onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}
