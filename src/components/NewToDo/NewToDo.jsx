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
        id: Date.now(),
        title: newTask,
        completed: false,
      };

      dispatch(addTask(newTodo));

      setNewTask("");
      console.log(newTask)
      console.log('newTodo', newTodo)
    }
  };

  return (
   
      <form onSubmit={handleSubmit}>
        <input className={css.input}
          type="text"
          name="newTask"
        placeholder="New task"
        value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      <button className={css.btn}>Add new task</button>
       {loading && <Loader />}
      {error && <p>{error}</p>}
      </form>
     
  
  );
}
