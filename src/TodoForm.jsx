function TodoForm() {
  return (
    <form>
      <label htmlFor="todoTitle">Task</label>
      <input type="text" id="todoTitle" />
      <button type="submit" disabled> Add Task </button>
    </form>
  );
}

export default TodoForm;
