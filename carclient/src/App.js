import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Cars from "./pages/Cars";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Tires from "./pages/Tires";

function App() {
  return (
    <Router>
      <Route path="/" exact Component={Cars}></Route>
    </Router>

    // <Route path="/" exact Component={Cars}></Route>
    // <Route path="/" exact Component={Tires}></Route>
    // <Route path="/" exact Component={Login}></Route>
    // <Route path="/" exact Component={CreateAccount}></Route>

    /* <div className="App">
      <header className="App-header">
        <h1>Welcome to the car API</h1>

        <h4>
          View cars, tires and edit the database, <br></br> by creating an
          account
        </h4>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <button type="button" className="buttonFrontPage btn btn-primary">
            View Cars
          </button>
          <button type="button" className="buttonFrontPage btn btn-primary">
            View Tires
          </button>
          <button type="button" className="buttonFrontPage btn btn-primary">
            Login
          </button>
          <button type="button" className="buttonFrontPage btn btn-primary">
            Create Account
          </button>
          
        </div>
      </header>
    </div> */
  );
}

export default App;
