import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "./todo-item.styles.css";
const TodoItem = ({ todo, onTodoClick, onDeleteClick, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const handleDelete = () => {
    onDeleteClick(todo.id);
  };
  const startEditing = () => {
    setIsEditing(true);
  };
  const onTodoChanged = (evt) => {
    setText(evt.target.value);
  };
  return (
    <div className="todo-container">
      {!isEditing && <p onClick={onTodoClick}>{todo.text}</p>}
      {isEditing && (
        <input
          onChange={onTodoChanged}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setIsEditing(false);
              onEditTodo(todo.id, text);
            }
          }}
        />
      )}
      <div className="todo-controls">
        <FontAwesomeIcon className="icon" icon={faPen} onClick={startEditing} />
        <FontAwesomeIcon
          className="icon"
          icon={faTrash}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default TodoItem;
