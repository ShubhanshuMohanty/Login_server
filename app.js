import connectDB from "./db/connection.js";
import express from "express";
import UserRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
// Connect to MongoDB
connectDB();
const PORT=3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors())

app.use("/api/v1/user", UserRoute);

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})