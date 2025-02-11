import { useDispatch } from "react-redux";
import css from "./DoItem.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { deleteTask } from "../../redux/api";
import { toggleTask } from "../../redux/slices/paginationSlice.js";

export default function DoItem({ todo }) {
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(toggleTask(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(todo.id));
  };
  return (
    <div className={css.loadingContainer}>
      <li key={todo.id} className={css.item}>
        <h3>{`Task #${todo.id}`}</h3>
        <div>
          <input
            type="checkbox"
            id={todo.id}
            checked={todo.completed}
            onChange={handleChange}
          />
          <label htmlFor={todo.id}>{todo.title}</label>
          <button type="button" onClick={handleDelete}>
            <IoIosCloseCircleOutline />
          </button>
        </div>
      </li>
    </div>
  );
}
