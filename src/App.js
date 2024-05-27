import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoItem from "./components/todo-item/todo-item.component";
import { v4 as uuid } from "uuid";
function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodoItem = (evt) => {
    setTodos([...todos, { text: input, id: uuid() }]);
    setInput("");
  };

  const toggleTodoComplete = (e) => {
    console.log("todo toggled ", e.target.className);
    if (e.target.className.includes("completed")) {
      e.target.className = e.target.className.replace("completed", "");
      console.log("remove  ", e.target.className);
    } else {
      e.target.className += " completed";
      console.log("add  ", e.target.className);
    }
  };

  return (
    <div className="App">
      <div className="title-container">
        <h1>Todo List</h1>
        <span>A Todo App made with React and Firebase</span>
      </div>
      <div className="todos">
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} onTodoClick={toggleTodoComplete}>
            {t.todo}
          </TodoItem>
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
