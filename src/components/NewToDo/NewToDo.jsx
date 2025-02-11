import { useState } from "react";
import css from "./NewToDo.module.css";
import { addTask } from "../../redux/api";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoading } from "../../redux/selectors";

export default function NewToDo() {
  const [newTask, setNewTask] = useState("");

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim()) {
      const newTodo = {
        title: newTask,
        completed: false,
      };

      dispatch(addTask(newTodo));
      setNewTask("");
    }
  };

  return (
    <div className={css.newToDoContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="newTask"
          placeholder="New task"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button>Add new task</button>
      </form>
      {loading && <Loader />}
      {error && <p>{error}</p>}
    </div>
  );
}
