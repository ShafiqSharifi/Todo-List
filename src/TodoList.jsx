function TodoList() {
  const todoList = [
    { id: 1, title: "Study React" },
    { id: 2, title: "Complete homework" },
    { id: 3, title: "Practice JavaScript" },
  ];

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default TodoList;
