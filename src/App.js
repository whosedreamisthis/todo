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
    if (e.target.className.includes("completed")) {
      e.target.className = e.target.className.replace("completed", "");
    } else {
      e.target.className += " completed";
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };
  const editTodo = (id, newText) => {
    const newTodos = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        newTodos.push({ id, text: newText });
      } else {
        newTodos.push(todos[i]);
      }
    }
    setTodos(newTodos);
  };

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
          value={input}
          onChange={(evt) => setInput(evt.target.value)}
        ></input>
        <button onClick={addTodoItem} className="add-button">
          Add
        </button>
      </div>
      <div className="todos">
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onTodoClick={toggleTodoComplete}
            onDeleteClick={deleteTodo}
            onEditTodo={editTodo}
          >
            {t.todo}
          </TodoItem>
        ))}
      </div>
    </div>
  );
}

export default App;
