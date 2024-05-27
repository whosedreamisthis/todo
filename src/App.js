import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { v4 as uuid } from "uuid";
function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodoItem = (evt) => {
    setTodos([...todos, { todo: input, id: uuid() }]);
    setInput("");
  };
  return (
    <div className="App">
      <div className="title-container">
        <h1>Todo List</h1>
        <span>A Todo App made with React and Firebase</span>
      </div>
      <div className="todos">
        {todos.map((t) => (
          <p key={t.id}>{t.todo}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          className="input"
          placeholder="Type in a todo item."
          value={input}
          onChange={(evt) => setInput(evt.target.value)}
        ></input>
        <button onClick={addTodoItem} className="add-button">
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
