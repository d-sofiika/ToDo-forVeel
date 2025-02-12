import css from "./DoList.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHasMore,
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
  const currentPage = useSelector(selectPage);
  const hasMore = useSelector(selectHasMore);

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(fetchTasks({ page: 1 }));
    }
  }, [dispatch, todos.length]);

  const handleMore = () => {
   if (!loading && hasMore) {
      dispatch(fetchTasks({ page: currentPage + 1 }));
    }
  };
 
  return (
    <div className={css.vehicleListContainer}>
      {todos.length > 0 && (
        <ul className={css.list}>
          {todos.map((todo) => (
            <DoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
      {hasMore ? (
        <button
          className={css.btn}
          type="button"
          onClick={handleMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      ): (
        <p>No tasks available.</p>
      )}
     
    </div>
  );
}
