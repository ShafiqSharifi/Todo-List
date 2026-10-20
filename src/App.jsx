import "./App.css";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList.jsx";
import { useState } from "react";

const todos = [
    { id: 1, title: "Study React" },
    { id: 2, title: "Complete homework" },
    { id: 3, title: "Practice JavaScript" },
  ];

function App() {
  const [todoList, setTodoList] = useState(todos);
  
  return (
    <div>
      <h1>TaskFlow</h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
