import { createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, fetchTasks } from "./api";

const loadState = () => {
  try {
    const localState = localStorage.getItem("todos");
    return localState ? JSON.parse(localState) : { todos: [], deleted: [] };
  } catch (e) {
    console.error(e);
    return { todos: [], deleted: [] };
  }
};
const saveState = (state) => {
  localStorage.setItem(
    "todos",
    JSON.stringify({ todos: state.todos, deleted: state.deleted })
  );
};
const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const updateState = (state) => {
  state.loading = false;
  state.error = null;
  saveState(state);
};

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: loadState().todos || [],
    deleted: loadState().deleted || [],
    loading: false,
    error: null,
    page: 1,
    fetched: false,
    hasMore: true,
  },
  reducers: {
    toggleTask: (state, action) => {
      const task = state.todos.find((todo) => todo.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveState(state);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, handlePending)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const uniqueTodos = [
          ...(state.todos || []),
          ...action.payload.data,
        ].reduce((acc, todo) => {
          const isDeleted = state.deleted.some(
            (deletedTodo) => deletedTodo.id === todo.id
          );
          if (!acc.find((item) => item.id === todo.id) && !isDeleted) {
            acc.push(todo);
          }
          return acc;
        }, []);

        state.todos = uniqueTodos;
        state.fetched = true;
        state.page = action.payload.page;

        state.hasMore = action.payload.data.length > 0;
        updateState(state);
      })
      .addCase(fetchTasks.rejected, handleRejected)
      .addCase(deleteTask.pending, handlePending)

      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );

        if (deletedTodo) {
          state.deleted.push({ ...deletedTodo });
        }

        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        updateState(state);
      })
      .addCase(deleteTask.rejected, handleRejected)
      .addCase(addTask.pending, handlePending)
      .addCase(addTask.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
        updateState(state);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { toggleTask } = todosSlice.actions;
export default todosSlice.reducer;
