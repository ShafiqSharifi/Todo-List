import "./App.css";
import TodoForm from "./features/TodoForm.jsx";
import TodoList from "./features/TodoList/TodoList.jsx";
import { useState } from "react";



function App() {
  const [todoList, setTodoList] = useState([]);
  
  function addTodo(todoTitle){
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    }
    setTodoList(previous => [newTodo, ...previous]);
  }

  function completeTodo (id){
    const updatedTodos = todoList.map((todo) => {
      return todo.id === id 
        ? {...todo, isCompleted : true } 
        : todo;
    });
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>TaskFlow</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList 
        todoList={todoList} 
        onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
