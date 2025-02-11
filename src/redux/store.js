import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/paginationSlice"
export const store = configureStore({  reducer: { 
    pagination: todosReducer
  }});
