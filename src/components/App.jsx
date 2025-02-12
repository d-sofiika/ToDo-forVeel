import { useState } from "react";
import DoList from "./DoList/DoList";
import NewToDo from "./NewToDo/NewToDo";
import { useSelector } from "react-redux";
import { selectError, selectLoading } from "../redux/selectors";
import Loader from "./Loader/Loader";

function App() {
    const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [todos, setTodos] = useState([]);
  return (
    <div className="section">
       {loading && <Loader />}
            {error && <p >Oops! Something went wrong.</p>}
      <NewToDo setTodos={setTodos}/>
      <DoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
