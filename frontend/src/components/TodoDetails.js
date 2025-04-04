import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function TodoDetails({ todo, onUpdate, onDelete, onBack }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title === "Untitled" ? "" : todo.title || "");
      setDescription(todo.description || "");
    }
  }, [todo]);

  if (!todo) {
    return <p className="text-gray-500 text-lg">Select a Todo</p>;
  }

  return (
    <div className="w-2/3 p-4 bg-white shadow-2xl rounded-lg">
      {/* Top Bar with Back, Save, and Delete Buttons */}
      <div className="flex justify-between items-center mb-4">
        {/* Back Button */}
        <button
          onClick={() => {
            setTitle("");
            setDescription("");
            onBack();
          }}
          className="p-2 bg-gray-300 text-black rounded cursor-pointer flex items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-black text-lg mr-2" />
        </button>

        <div className="flex space-x-4">
          {/* Save Button */}
          <button
            onClick={() => {
              onUpdate(todo._id, title.trim() || "Untitled", description.trim());
            }}
            className="p-2 text-black rounded cursor-pointer flex items-center"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="text-black text-xl" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(todo._id)}
            className="p-2 text-black rounded cursor-pointer flex items-center"
          >
            <FontAwesomeIcon icon={faTrashCan} className="text-black text-xl" />
          </button>
        </div>
      </div>

      {/* Title Input */}
      <label htmlFor="todo-title" className="sr-only">Title</label>
      <input
        id="todo-title"
        name="title"
        className="text-2xl font-bold w-full p-2 border-b"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        autoComplete="off"
      />

      {/* Description Input */}
      <label htmlFor="todo-description" className="sr-only">Description</label>
      <textarea
        id="todo-description"
        name="description"
        className="w-full h-32 p-2 mt-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
        autoComplete="off"
      />
    </div>
  );
}
