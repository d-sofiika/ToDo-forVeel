import { useDispatch } from "react-redux";
import css from "./DoItem.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { deleteTask } from "../../redux/api";
import { toggleTask } from "../../redux/paginationSlice.js";
import { Toaster, toast } from "react-hot-toast";

export default function DoItem({ todo }) {
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(toggleTask(todo.id));
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(todo.id)).unwrap();
      toast("Task deleted successfully!", {
        icon: "👏",
      });
    } catch (error) {
      toast.error("Failed to delete task. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <li key={todo.id} className={css.item}>
        <input
          className={css.input}
          type="checkbox"
          id={todo.id}
          checked={todo.completed}
          onChange={handleChange}
        />
        <span
          className={`${css.circle} ${
            todo.completed ? css.completedCircle : css.notCompletedCircle
          }`}
        ></span>

        <label
          className={`${css.label} ${
            todo.completed ? css.completed : css.notCompleted
          }`}
          htmlFor={todo.id}
        >
          {todo.title}
        </label>

        <button type="button" onClick={handleDelete}>
          <MdDeleteOutline className={css.btn} />
        </button>
      </li>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
