import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/todos';


export const getToDo = async (endpoint, params = {limit: 10}) => {
  try {
    const response = await axios.get(`${url}${endpoint}`, {
      params
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postMovie = async (endpoint,data = {}) => {
  try {
    const response = await axios.post(`${url}${endpoint}`, data);
   
    return response.data;
    
  } catch (error) {
    console.error('Error:', error);
  }
};