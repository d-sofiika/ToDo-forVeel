import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./paginationSlice"
export const store = configureStore({  reducer: { 
    pagination: todosReducer
  }});
