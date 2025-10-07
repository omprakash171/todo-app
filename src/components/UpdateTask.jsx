
import "../style/addtask.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

export default function UpdateTask() {
    const [taskData, setTaskData] = useState()
    const navigate = useNavigate()
    
    const {id} = useParams();

    useEffect(() => {
        getTask(id)
    }, [])
    
    const getTask = async (id) => {
        let task = await fetch("http://localhost:3200/task/" + id);
        task = await task.json();
        if(task.result){
            setTaskData(task.result)
        }
    }

    const updateTask = async () => {
        console.log("function called", taskData)
        let task = await fetch("http://localhost:3200/update-task", {
            method: "PUT", 
            body: JSON.stringify(taskData), 
            headers: {
                "Content-Type": "application/json"
            }
        })
        task = await task.json();
        if(task){
            navigate("/")
        }
    }

    return (
        <div className="container">
            <h1>Update Task</h1>
            
                <label htmlFor="">Title</label>
                <input value={taskData?.title} type="text" onChange={(event) => setTaskData({...taskData, title: event.target.value})} name="title" placeholder="Enter task title" />
                <label htmlFor="">Description</label>
                <textarea value={taskData?.description} name="description" onChange={(event) => setTaskData({...taskData, description: event.target.value})} rows={4} placeholder="Enter task description" id=""></textarea>
                <button onClick={updateTask} className="submit">Update Task</button>
            
        </div>
    )
}