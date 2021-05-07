import { Navbar } from "./components/layouts/Navbar";
import { Users } from "./components/users/Users";
import { Search } from "./components/users/Search";
import { Alert } from "./components/layouts/Alert";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { About } from "./components/pages/About";
import { User } from "./components/users/User";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import "./App.css";

export const App = () => {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />

              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <>
                      <Search />
                      <Users />
                    </>
                  )}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
};

export default App;
