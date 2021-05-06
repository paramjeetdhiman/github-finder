import React, { useState } from "react";
import "./App.css";
import { Navbar } from "./components/layouts/Navbar";
import { Users } from "./components/users/Users";
import axios from "axios";
import { Search } from "./components/users/Search";
import { Alert } from "./components/layouts/Alert";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { About } from "./components/pages/About";
import { User } from "./components/users/User";

export const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  /// search github users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  /// get a single github users

  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  /// get user repos

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  /// clear user from state
  const clearUsers = () => {
    setLoading(false);

    setUsers([]);
  };

  /// set alerts

  const showAlert = (msz, type) => {
    setAlert({ msz, type });
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users users={users} loading={loading} />
                </>
              )}
            />
            <Route exact path="/about" component={About} />

            {/* pass props to route */}
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  user={user}
                  loading={loading}
                  getUserRepos={getUserRepos}
                  repos={repos}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
