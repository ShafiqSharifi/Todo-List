
import { useEffect, useState } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList/TodoList.jsx";

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchTodos() {
      setIsTodoListLoading(true);

      try {
        const response = await fetch("/api/tasks?page=0&limit=99", {
          headers: {
            "X-CSRF-TOKEN": token
          },
          credentials: "include"
        });

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();

        if (!ignore) {
          setTodoList(data.tasks);
          setError("");
        }
      } catch (error) {
        if (!ignore) {
          setError(error.message);
        }
      } finally {
        if (!ignore) {
          setIsTodoListLoading(false);
        }
      }
    }

    if (token) {
      fetchTodos();
    }

    return () => {
      ignore = true;
    };
  }, [token]);

  async function addTodo(todoTitle) {
    setError("");

    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };

    setTodoList(previous => [newTodo, ...previous]);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token
        },
        credentials: "include",
        body: JSON.stringify({
          title: newTodo.title,
          isCompleted: newTodo.isCompleted
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const savedTodo = await response.json();

      setTodoList(previous =>
        previous.map(todo =>
          todo.id === newTodo.id ? savedTodo : todo
        )
      );
    } catch (error) {
      setTodoList(previous =>
        previous.filter(todo => todo.id !== newTodo.id)
      );

      setError(error.message);
    }
  }

  async function completeTodo(id) {
    setError("");

    const originalTodo = todoList.find(todo => todo.id === id);

    if (!originalTodo) {
      return;
    }

    setTodoList(previous =>
      previous.map(todo =>
        todo.id === id
          ? { ...todo, isCompleted: true }
          : todo
      )
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token
        },
        credentials: "include",
        body: JSON.stringify({
          isCompleted: true
        })
      });

      if (!response.ok) {
        throw new Error("Failed to complete todo");
      }
    } catch (error) {
      setTodoList(previous =>
        previous.map(todo =>
          todo.id === id ? originalTodo : todo
        )
      );

      setError(error.message);
    }
  }

  async function updateTodo(editedTodo) {
    setError("");

    const originalTodo = todoList.find(
      todo => todo.id === editedTodo.id
    );

    if (!originalTodo) {
      return;
    }

    setTodoList(previous =>
      previous.map(todo =>
        todo.id === editedTodo.id ? { ...editedTodo } : todo
      )
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token
        },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      setTodoList(previous =>
        previous.map(todo =>
          todo.id === editedTodo.id ? originalTodo : todo
        )
      );

      setError(error.message);
    }
  }

  return (
    <div>
      {error && (
        <div role="alert">
          <p>{error}</p>
          <button onClick={() => setError("")}>
            Clear Error
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default TodosPage;
