import "./todo-item.styles.css";
const TodoItem = ({ todo, onTodoClick }) => {
  return (
    <div className="todo-container">
      <p onClick={onTodoClick}>{todo.text}</p>
      <div className="todo-controls">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
