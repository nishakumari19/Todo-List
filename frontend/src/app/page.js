"use client";
import { useState, useEffect } from "react";
import { fetchTodos, createTodo, getTodoById, updateTodo, deleteTodo } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import TodoDetails from "@/components/TodoDetails";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  const handleCreate = async () => {
    const newTodo = await createTodo("Untitled", "");
    setTodos([newTodo, ...todos]);
    setSelectedTodo(newTodo);
  };

  const handleSelect = async (id) => {
    const todo = await getTodoById(id);
    setSelectedTodo(todo);
  };

  const handleUpdate = async (id, title, description) => {
    const updatedTodo = await updateTodo(id, title, description);
    setTodos((prevTodos) => prevTodos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t)));
    setSelectedTodo(null);
  };

  const handleDelete = async (id) => {
    if (selectedTodo && selectedTodo._id === id) {
      setSelectedTodo(null); 
    }

    await deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="flex flex-col items-center h-screen p-4">
      {/* Centered Header */}
      <div className="bg-black w-full text-center py-3 rounded-md">
        <h1 className="text-3xl font-bold text-white">TO-DO List</h1>
      </div>

      {/* Sidebar and TodoDetails */}
      <div className="flex w-full max-w-5xl gap-4 mt-4">
        <Sidebar todos={todos} onCreate={handleCreate} onSelect={handleSelect} onDelete={handleDelete} />
        <TodoDetails 
          todo={selectedTodo} 
          onUpdate={handleUpdate} 
          onDelete={handleDelete} 
          onBack={() => setSelectedTodo(null)} 
        />
      </div>
    </div>
  );
}
