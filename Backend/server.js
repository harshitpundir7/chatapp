import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import cookieParser from 'cookie-parser'

const app = express();
dotenv.config()

app.use(cors({
    origin: "http://localhost:5174",
    credentials:true
}))
app.use(cookieParser());
app.use(express.json());

connectDb();

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)


const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is Running on Port ${PORT}`)
})
