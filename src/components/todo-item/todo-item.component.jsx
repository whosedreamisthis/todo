import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

import "./todo-item.styles.css";
const TodoItem = ({ todo, onTodoClick, onDeleteClick, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const handleDelete = () => {
    onDeleteClick(todo.id);
  };
  const startEditing = () => {
    setIsEditing(true);
  };
  const onTodoChanged = (evt) => {
    setText(evt.target.value);
  };
  const onTodoContainerClicked = (evt) => {
    setIsEditing(false);
    if (text !== "") {
      onEditTodo(todo.id, text);
    }
  };
  return (
    <div className="todo-container">
      {!isEditing && <p onClick={onTodoClick}>{todo.text}</p>}
      {isEditing && (
        <div className="input-container">
          <input
            value={text}
            onChange={onTodoChanged}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setIsEditing(false);
                if (text !== "") {
                  onEditTodo(todo.id, text);
                }
              }
            }}
          />
          <FontAwesomeIcon
            className="icon"
            icon={faCheck}
            onClick={onTodoContainerClicked}
          />
        </div>
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
