import { useState, useEffect } from "react";
import Navbar from "./component/navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (e, id) => {
    const editedTodo = prompt("Edit Todo:", todo);
    if (editedTodo !== null) {
      const updatedTodos = todos.map((item) =>
        item.id === id ? { ...item, todo: editedTodo } : item
      );
      setTodos(updatedTodos);
    }
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const handleCheckBox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto w-3/4 bg-yellow-100 p-5 my-5 rounded-xl min-h-[80vh]">
        <div className=" ">
          <div className="addTodo">
            <h1 className="text-lg font-bold my-5">Add a todo</h1>
            <input
              type="text"
              className="rounded-md p-2 w-1/2"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button
              onClick={handleAdd} disabled = {todo.length<=3}
              className="bg-white p-3 py-1 rounded-md mx-10 hover:font-bold disabled:bg-slate-500" 
            >
              Save
            </button>
          </div>
          <h1 className="font-bold text-xl text-black-600 my-5">Your Todo</h1>
          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5">Nothing in the todo right now</div>
            )}
            {todos.map((item) => (
              <div key={item.id} className="todo flex my-3 justify-between w-1/4">
                <div className="flex gap-4">
                  <input
                    onChange={handleCheckBox}
                    type="checkbox"
                    name={item.id}
                    checked={item.isCompleted}
                    className="p-3"
                  />
                  <div
                    className={`p-3 ${item.isCompleted ? "line-through" : ""}`}
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="button flex">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="w-18 p-2 bg-white rounded-md mx-10 hover:font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="w-18 p-2 bg-white rounded-md hover:font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
