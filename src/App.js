import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="title-container">
        <h1>Todo List</h1>
        <span>A Todo App made with React and Firebase</span>
      </div>
      <div>
        <input
          type="text"
          className="input"
          placeholder="Type in a todo item."
        ></input>
        <button className="add-button">Add</button>
      </div>
    </div>
  );
}

export default App;
