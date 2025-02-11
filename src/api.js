import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com';


export const getToDo = async(endpoint = 'todos', limit = 10) => {
  try {
    const response = await axios.get(`${url}/${endpoint}`, {
       params: { _limit: limit },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const postMovie = async (endpoint = 'todos',data = {}) => {
  try {
    const response = await axios.post(`${url}/${endpoint}`, data);
   
    return response.data;
    
  } catch (error) {
    console.error('Error:', error);
  }
};