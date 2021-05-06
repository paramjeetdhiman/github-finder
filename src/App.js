import React from "react";
import "./App.css";
import { Navbar } from "./components/layouts/Navbar";
import { Users } from "./components/users/Users";
import axios from "axios";

class App extends React.Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);

    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data,
      loading: false,
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default App;
