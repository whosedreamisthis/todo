import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoItem from "./components/todo-item/todo-item.component";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  getTodoListFromDatabase,
  addTodoToDatabase,
  editTodoList,
} from "./firebase-utils.js";

import { v4 as uuid } from "uuid";
import { signOut } from "firebase/auth";
function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const addTodoItem = (evt) => {
    if (input === "") {
      return;
    }
    const newTodos = [...todos, { text: input, id: uuid() }];
    setTodos([{ text: input, id: uuid(), completed: false }, ...todos]);
    setInput("");
    addTodoToDatabase(user, newTodos);
  };

  const toggleTodoComplete = (e, id) => {
    console.log("toggle todo compplete start");

    if (e.target.className.includes("complete")) {
      e.target.className = e.target.className.replace("complete", "");
    } else {
      e.target.className += " complete";
    }
    const newTodos = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        //newTodos.unshift({ ...todos[i], complete: !todos[i].complete });
        newTodos.push({ ...todos[i], complete: !todos[i].complete });
      } else {
        newTodos.push(todos[i]);

        // newTodos.push(todos[i]);
      }
    }
    setTodos(newTodos);
    editTodoList(user, newTodos);
    console.log("toggle todo compplete ", newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
    editTodoList(user, newTodos);
  };
  const editTodo = (id, newText) => {
    if (newText === "") {
      return;
    }
    const newTodos = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        newTodos.unshift({ ...todos[i], text: newText });
        // newTodos.push({ id, text: newText });
      } else {
        // newTodos.push(todos[i]);
        newTodos.push(todos[i]);
      }
    }
    setTodos(newTodos);
    editTodoList(user, newTodos);
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
    setUser(user);
    const todos = await getTodoListFromDatabase(user);
    setIsSignedIn(true);
    setTodos(todos);
  };

  const logOut = async () => {
    const response = await signOut;
    setIsSignedIn(false);
    setTodos([]);
    setUser("");
    setInput("");
  };

  return (
    <div className="App">
      <div className="title-container">
        <h1>Todo List</h1>
        <span>A Todo App made with React</span>
      </div>

      {isSignedIn ? (
        <>
          <button className="sign-button" onClick={logOut}>
            Sign Out
          </button>
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
        </>
      ) : (
        <button className="sign-button" onClick={logGoogleUser}>
          Sign In
        </button>
      )}
      {/* <div>
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
      </div> */}
      <div className="todos-container">
        <div className="todos">
          {todos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onTodoClick={(e) => {
                toggleTodoComplete(e, t.id);
              }}
              onDeleteClick={deleteTodo}
              onEditTodo={editTodo}
            >
              {t.todo}
            </TodoItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
