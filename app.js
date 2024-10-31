import connectDB from "./db/connection.js";
import express from "express";
// Connect to MongoDB
connectDB();
const PORT=3000;
const app = express();

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})