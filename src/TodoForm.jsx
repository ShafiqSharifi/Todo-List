import { useRef } from "react";

function TodoForm({onAddTodo}) {
  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
    
    const todoTitle = event.target.todoTitle.value.trim();

    if(todoTitle){
      onAddTodo(todoTitle);
      event.target.reset();
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Task</label>
      <input ref={inputRef} 
      type="text" 
      id="todoTitle" 
      name="todoTitle" 
      placeholder="Enter your task" 
      required />
      <button type="submit"> 
        Add Task 
      </button>
    </form>
  );
}

export default TodoForm;
