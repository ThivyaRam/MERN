import React,{useState,useEffect} from 'react' 
import axios from 'axios'
function Create({setTodos,fetchTodos}) {
  const [task,setTask]=useState("")
  const handleAdd=()=>{
    axios.post('http://localhost:3001/add',{task:task})
    .then(result=>{
      fetchTodos(); // Get the updated list from the server
      setTask("");
    })
    .catch(err=>console.log(err))
  }
  return (
    <div className="create_form " >
      <input type="text" name="" id="" placeholder="Enter task" value={task} onChange={(e)=>setTask(e.target.value)} />
      <button type="submit" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
