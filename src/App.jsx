import "./App.css";

function App() {
  const todoList = [
    { id: 1, title: "Study week 1 material" },
    { id: 2, title: "Submit week 1 assignment" },
    { id: 3, title: "Complete week 1 quiz" },
  ];
  return (
    <div>
      <h1>TaskFlow</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
