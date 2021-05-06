import React from "react";
import "./App.css";
import { Navbar } from "./components/layouts/Navbar";
import { Users } from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import { Alert } from "./components/layouts/Alert";

class App extends React.Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  /// search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data.items,
      loading: false,
    });
  };

  /// clear user from state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false,
    });
  };

  /// set alerts

  setAlert = (msz, type) => {
    this.setState({ alert: { msz, type } });
    setTimeout(() => this.setState({ alert: null }), 2000);
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
