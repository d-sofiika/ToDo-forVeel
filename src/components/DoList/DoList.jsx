import css from "./DoList.module.css";
import { useEffect } from "react";
import Loader from "../Loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectLoading,
  selectPage,
  selectTodos,
} from "../../redux/selectors";
import DoItem from "../DoItem/DoItem.jsx";
import { fetchTasks } from "../../redux/api.js";

export default function DoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectPage);

  useEffect(() => {
    dispatch(fetchTasks({ page: 1 }));
  }, [dispatch]);

  const handleMore = () => {
    dispatch(fetchTasks({ page: currentPage + 1 }));
  };

  return (
    <div className={css.vehicleListContainer}>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {todos.length > 0 && !loading && !error && (
        <ul className={css.list}>
          {todos.map((todo) => (
            <DoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
      <button type="button" onClick={handleMore}>
        Load more
      </button>
    </div>
  );
}
