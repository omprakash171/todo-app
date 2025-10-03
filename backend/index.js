import e from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors"
const app = e();

app.use(e.json());
app.use(cors())
app.post("/add-task", async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    if(result){
        resp.send({message: "new task added", success: true, result})
    } else {
        resp.send({message: "task not added", success: false})
    }
})

app.get("/tasks", async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.find().toArray();
    if(result){
        resp.send({message: "task list fetched", success: true, result})
    } else {
        resp.send({message: "error try after sometime", success: false})
    }
})

app.listen(3200)