import { useState } from "react"
import "../style/addtask.css"
import { useNavigate } from "react-router-dom"

export default function AddTask() {
    const [taskData, setTaskData] = useState()
    const navigate = useNavigate()
    const handleAddTask = async () => {
        console.log(taskData)
        let result = await fetch("http://localhost:3200/add-task", {
            method: "POST", 
            body: JSON.stringify(taskData), 
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        if(result.success){
            navigate("/")
            console.log("New Task Added")
        }else{
            alert("Try after sometime")
        }
    }

    return (
        <div className="container">
            <h1>Add New Task</h1>
            
                <label htmlFor="">Title</label>
                <input type="text" onChange={(event) => setTaskData({...taskData, title: event.target.value})} name="title" placeholder="Enter task title" />
                <label htmlFor="">Description</label>
                <textarea name="description" onChange={(event) => setTaskData({...taskData, description: event.target.value})} rows={4} placeholder="Enter task description" id=""></textarea>
                <button onClick={handleAddTask} className="submit">Add New Task</button>
            
        </div>
    )
}