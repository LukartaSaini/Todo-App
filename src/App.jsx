import { useEffect } from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import { v4 as uuidv4 } from "uuid";
// import { i } from "vite/dist/node/types.d-FdqQ54oU";

import Navbar from "./components/Navbar";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [finished, setfinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const savetl = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const togglefinished = (e) => {
    setfinished(!finished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);

    let newtodos = todos.filter((item) => {
      return item.id != id;
    });
    settodos(newtodos);
    savetl()
  };

  const handleDelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id != id;
    });

    settodos(newtodos);
    savetl()
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    savetl()
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    savetl()
  }

  return (
    <>
      <Navbar />

      <div className="md:container bg-violet-200 mx-auto p-5 rounded-xl min-h-[80vh] my-2 md:w-1/2 ">
        <h1 className="font-bold text-center text-2xl">iTask - Manage your todos at one place</h1>
        
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full mt-3 rounded-lg p-1"
          />
          <button
            onClick={handleAdd} disabled={todo.length<=3} 
            className="
             bg-violet-800 disabled:bg-violet-700  hover:bg-violet-950 p-2 py-1 text-white rounded-full my-2 px-3 font-bold text-sm mt-[13px] mb-[1px] mx-[4px]"
          >
            Save
          </button>
        </div>
        </div>
        <div className="ch flex">
        <input onChange={togglefinished} type="checkbox" checked={finished} />
       <div className=" mx-2  font-bold"> Show Finished</div>

       </div>
        <h2 className="text-xl font-bold my-3">Your Todo  </h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No to display</div>}
          {todos.map((item) => {
            return (finished||!item.isCompleted)&& (
              <div
                key={item.id}
                className="todo w-[55%] flex justify-between my-3"
              
              >
                <div className="t flex gap-3">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                </div>


                
                <div className="button flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2 font-bold text-sm md:ml-4"
                  >
                  <FaEdit />

                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2 font-bold text-sm"
                  >
                   <AiFillDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
