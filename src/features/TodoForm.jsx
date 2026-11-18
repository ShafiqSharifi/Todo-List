import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../utils/todoValidation";

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
      <TextInputWithLabel 
        elementId="todoTitle"
        labelText="Todo"
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        ref={inputRef} 
        value={workingTodoTitle}
        
         />
      <button type="submit" 
        disabled={!isValidTodoTitle(workingTodoTitle)}
        > 
        Add Task 
      </button>
    </form>
  );
}

export default TodoForm;
