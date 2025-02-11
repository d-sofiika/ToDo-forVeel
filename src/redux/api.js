import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com";

export const fetchTasks = createAsyncThunk(
  "todos/fetchData",
  async ({ page, limit = 10 }) => {
    try {
      const response = await axios.get(`${url}/todos`, {
        params: { _limit: limit, _page: page },
      });
      return { data: response.data, page };
    } catch (error) {
      console.error("Failed to load tasks:", error);
      throw error;
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/todos`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
  try {
    await axios.delete(`${url}/todos/${id}`);
    return {id}
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})
