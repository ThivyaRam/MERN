import React from 'react'
import {useState,useEffect} from 'react'
import Create from './create.jsx'
import axios from 'axios'
import { FaRegTrashCan } from "react-icons/fa6";
import { BsCircleFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";

function Home() {
    const[todos,setTodos]=useState([]);
    useEffect(()=>{
      axios.get('http://localhost:3001/get')
      .then(result=>setTodos(result.data))
      .catch(err=>console.log(err))
    },[])

    const handleEdit=(id)=>{
      axios.put('http://localhost:3001/update/'+id)
      axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err=>console.log(err))
    
    }
 const handleDelete=(id)=>{
  axios.delete('http://localhost:3001/delete/'+id)
  handleEdit(id);
 }
 
 const fetchTodos = () => {
  axios.get('http://localhost:3001/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err));
};

useEffect(() => {
  fetchTodos();
}, []);
  return (
    <div className="home">
      <h2>Todo list</h2>
      <Create setTodos={setTodos} fetchTodos={fetchTodos}></Create>
      {

      todos.length===0
      ?
      <div><h2>No Record</h2></div>
      :
      todos.map(todo=>(
        <div className="task" key={todo._id}>
            <div className="checkbox" onClick={()=>handleEdit(todo._id)}>
            {todo.done?<BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
           : <BsCircleFill className="icon"></BsCircleFill>
            }
            <p className={todo.done?"line_through":""}> {todo.task}</p>
            </div>

            <div>
            <span><FaRegTrashCan className="icon" onClick={()=>handleDelete(todo._id)}/></span>
            </div>
            </div>
      ))}
    </div>
  )
}

export default Home
