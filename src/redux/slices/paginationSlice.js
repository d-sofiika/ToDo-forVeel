  import { createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, fetchTasks} from "../api";


const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
    page: 1,
  },
  reducers: {
    resetTodos: (state) => {
      state.todos = [];
      state.page = 1;
    },
    toggleTask: (state, action) => {
      const task = state.todos.find(todo => todo.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTask.pending, handlePending)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
      })
      .addCase(deleteTask.rejected, handleRejected)
      .addCase(addTask.pending,handlePending)
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.todos.unshift(action.payload)
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTasks.pending, handlePending)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.todos = action.payload.data;
        } else {
          state.todos = [...state.todos, ...action.payload.data];
        }
        state.page = action.payload.page;
      })
      .addCase(fetchTasks.rejected, handleRejected);
  },
});
export const {resetTodos, toggleTask} = todosSlice.actions;
export default todosSlice.reducer;
