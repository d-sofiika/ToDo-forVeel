import css from "./DoList.module.css";
import { deleteToDo, getToDo } from "../../api.js";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader.jsx";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function DoList({ todos, setTodos }) {
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

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteToDo("todos", id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      setError("Failed to delete task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.vehicleListContainer}>

      {loading && <Loader />}
      {error && <p>{error}</p>}

      {todos.length > 0 && !loading && !error && (
        <ul className={css.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={css.item}>
              <h3>{`Task #${todo.id}`}</h3>
              <div>
                <input
                  type="checkbox"
                  id={todo.id}
                  checked={todo.completed}
                  onChange={() => handleChange(todo.id)}
                />
                <label htmlFor={todo.id}>{todo.title}</label>
                <button type="button" onClick={() => handleDelete(todo.id)}>
                  <IoIosCloseCircleOutline />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
