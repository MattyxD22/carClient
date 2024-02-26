import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import NavigationButtons from "./components/NavigationButtons";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the car API</h1>

        <h4>
          View cars, tires and edit the database, <br></br> by creating an
          account
        </h4>

        <NavigationButtons></NavigationButtons>
      </header>
    </div>
  );
}

export default App;
