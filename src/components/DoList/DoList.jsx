import css from "./DoList.module.css";
import { getToDo } from "../../api.js";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader.jsx";

export default function DoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getToDo();
        setTodos(data);
      } catch (error) {
        setError("Failed to load tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  return (
    <div className={css.vehicleListContainer}>
      {loading && <Loader active={loading} />}
      {error && <p>{error}</p>}
      {todos.length > 0 && !loading && !error && (
        <ul className={css.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={css.item}>
              <h3>{`Task #${todo.id}`}</h3>
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleChange(todo.id)}
                />
                <label>{todo.title}</label>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
