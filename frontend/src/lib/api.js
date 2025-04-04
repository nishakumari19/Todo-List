import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTodos = async (page = 1) => {
  const { data } = await axios.get(`${API_URL}?page=${page}`);
  return data;
};

export const createTodo = async (title, description) => {
  const { data } = await axios.post(API_URL, { title, description });
  return data;
};

export const getTodoById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const updateTodo = async (id, title, description) => {
  const { data } = await axios.put(`${API_URL}/${id}`, { title, description });
  return data;
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error.response?.data || error.message);
  }
};
