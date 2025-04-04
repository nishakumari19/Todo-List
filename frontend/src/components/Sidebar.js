import TodoItem from "@/components/TodoItem";

export default function Sidebar({ todos, onCreate, onSelect, onDelete }) {
  return (
    <div className="w-1/3 p-4">
      <button onClick={onCreate} className="p-2 bg-black text-white rounded cursor-pointer shadow-md">
        + TODO
      </button>
      <ul className="mt-4 space-y-3">
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onSelect={onSelect} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
