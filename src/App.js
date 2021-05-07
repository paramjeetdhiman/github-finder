import { Navbar } from "./components/layouts/Navbar";
import { Alert } from "./components/layouts/Alert";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { About } from "./components/pages/About";
import { User } from "./components/users/User";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import { HomePage } from "./components/pages/HomePage";
import "./App.css";
import { NotFound } from "./components/pages/NotFound";

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
                <Route exact path="/" component={HomePage} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
};

export default App;
