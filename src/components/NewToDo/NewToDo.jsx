import { useState } from "react";
import css from "./NewToDo.module.css";
import { addTask } from "../../redux/api";
import { useDispatch} from "react-redux";
import { Toaster, toast } from "react-hot-toast";

export default function NewToDo() {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newTask.trim()) {
      const newTodo = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };

      try {
        await dispatch(addTask(newTodo)).unwrap();
        toast.success("Task added successfully!");
        setNewTask("");
      } catch (error) {
        toast.error("Failed to add task. Please try again.");
        console.error(error);
      }
    } else {
      toast.error("Enter the task.");
    }
  };

  return (
    <>
      
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="newTask"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={css.btn}>Add new task</button>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
