import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function TodoItem({ todo, onSelect, onDelete }) {
  return (
    <li
      className="p-3 cursor-pointer hover:bg-gray-100 rounded shadow-lg flex flex-col"
      onClick={() => onSelect(todo._id)}
    >
      <span className="font-bold">{todo.title || "Untitled Todo"}</span>
      <p className="text-sm text-gray-600 truncate">{todo.description || "No description"}</p>

      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-gray-500">
          {new Date(todo.updatedAt || todo.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(todo._id);
          }}
          className="p-1 text-black rounded cursor-pointer text-xl"
        >
          <FontAwesomeIcon icon={faTrashCan} className="text-black text-xl hover:text-gray-700" />
        </button>
      </div>
    </li>
  );
}