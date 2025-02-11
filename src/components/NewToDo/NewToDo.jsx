import { useState } from "react";
import css from "./NewToDo.module.css";
import { postToDo } from "../../api";
import Loader from "../Loader/Loader";

export default function NewToDo({ setTodos }) {
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (newTask.trim()) {
      const newTodo = {
        title: newTask,
        completed: false,
      };
      try {
        setLoading(true);
        const addedTask = await postToDo("todos", newTodo);
        setTodos((prevTodos) => [addedTask, ...prevTodos]);
        setNewTask("");
      } catch (error) {
        setError("Failed to add task:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={css.newToDoContainer}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="newTask" placeholder="New task"   onChange={(e) => setNewTask(e.target.value)} />
        <button>Add new task</button>
      </form>
      {loading && <Loader />}
      {error && <p>{error}</p>}
    </div>
  );
}
