import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import userRoutes from "./routes/userRoutes.js"

const app = express();
dotenv.config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(express.json());

connectDb();

app.use("/api/user", userRoutes)


const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is Running on Port ${PORT}`)
})
