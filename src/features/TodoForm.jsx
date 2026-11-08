import { useRef, useState } from "react";

function TodoForm({onAddTodo}) {
  const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    
    if(workingTodoTitle.trim()){
      onAddTodo(workingTodoTitle.trim());
      setWorkingTodoTitle("");
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
      value={workingTodoTitle}
      onChange={(event) => setWorkingTodoTitle(event.target.value)}
      placeholder="Enter your task" 
      required />
      <button type="submit" 
        disabled={!workingTodoTitle.trim()}
        > 
        Add Task 
      </button>
    </form>
  );
}

export default TodoForm;
