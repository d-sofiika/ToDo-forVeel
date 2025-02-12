import { useState } from "react";
import DoList from "./DoList/DoList";
import NewToDo from "./NewToDo/NewToDo";

function App() {
  const [todos, setTodos] = useState([]);
  return (
    <div className="section">
      <NewToDo setTodos={setTodos}/>
      <DoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
