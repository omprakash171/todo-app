
import "../style/addtask.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

export default function UpdateTask() {
    const [taskData, setTaskData] = useState()
    
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

    return (
        <div className="container">
            <h1>Update Task</h1>
            
                <label htmlFor="">Title</label>
                <input value={taskData?.title} type="text" onChange={(event) => setTaskData({...taskData, title: event.target.value})} name="title" placeholder="Enter task title" />
                <label htmlFor="">Description</label>
                <textarea value={taskData?.description} name="description" onChange={(event) => setTaskData({...taskData, description: event.target.value})} rows={4} placeholder="Enter task description" id=""></textarea>
                <button className="submit">Update Task</button>
            
        </div>
    )
}