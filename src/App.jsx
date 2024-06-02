import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [finished, setFinished] = useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem('todos')
    if(todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
    
  }, [])
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
    setFinished(!finished)
  }
  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo) 

    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id)=>{
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  return (
    <>
    <Navbar />
      <div className="mx-3 md:container md:mx-auto my-16 rounded-xl bg-slate-200 p-5 min-h-[80vh] md:w-[35%]">
          <h1 className='font-bold text-center text-3xl my-6'>iTask - Manage your tasks at one place</h1>
          <div className="addtodos flex flex-col">
            <h2 className='text-lg font-bold my-2'>Add a Todo</h2>
            
            <input onChange={handleChange} value={todo} type="text" className='w-full p-2'/>
            <button onClick={handleAdd} type='submit' disabled={todo.length<=0} className='bg-slate-700 disabled:bg-slate-500 hover:bg-slate-900 text-white py-2 rounded-md my-4 text-sm cursor-pointer'>Add</button>
           
            
          </div>
          <input onChange={toggleFinished} type='checkbox' checked={finished} className='my-5 '/> Show Finished
          <h2 className='font-bold text-lg'>Your Todos</h2>

          <div className="todos">
            {todos.length === 0 && <div className='text-red-600 my-3 font-medium'>Oops! No todos to display.</div>}
            {todos.map(item=>{

            
            return (finished || !item.isCompleted) && <div name={item.id} className="todo flex  my-3  justify-between">
                <div className="flex gap-5 ">
                  <input name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} id="" />
                  <div className={item.isCompleted? "line-through" : ""}>{item.todo}</div>
                </div>
                
                <div className="buttons  flex h-full ">
                <button onClick={(e)=>handleEdit(e, item.id)} className='text-slate-800 text-xl mx-3'><FaEdit />
</button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='text-slate-800 text-xl '><AiFillDelete /></button>
                </div>
            </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
