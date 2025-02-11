import axios from "axios";

const url = "https://jsonplaceholder.typicode.com";

export const getToDo = async (endpoint = "todos", limit = 10) => {
  try {
    const response = await axios.get(`${url}/${endpoint}`, {
      params: { _limit: limit },
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to load tasks");
  }
};

export const postToDo = async (endpoint = "todos", data = {}) => {
  try {
    const response = await axios.post(`${url}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteToDo = async (endpoint = "todos", id) => {
  try {
    const response = await axios.delete(`${url}/${endpoint}/${id}`);
    return response.status;
  } catch (error) {
    console.error("Error:", error);
  }
};
