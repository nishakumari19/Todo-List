import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

// Todo Schema (Auto `createdAt` & `updatedAt`)
const TodoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);
const Todo = mongoose.model("Todo", TodoSchema);

// Create a new Todo
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  const newTodo = new Todo({ title, description });
  await newTodo.save();
  res.json(newTodo);
});

// Fetch Paginated Todos
app.get("/todos", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const todos = await Todo.find()
    .sort({ createdAt: -1 }) // Sorted by createdAt
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(todos);
});

// Get Todo by ID
app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

// Update Todo
app.put("/todos/:id", async (req, res) => {
  const { title, description } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, description }, // Auto-updates `updatedAt`
    { new: true }
  );
  if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
  res.json(updatedTodo);
});

// Delete Todo by ID
app.delete("/todos/:id", async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
  res.json({ message: "Todo deleted successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
