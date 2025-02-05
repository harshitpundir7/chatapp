import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGOURI)
        console.log("Database Connected")
    } catch (error) {
        console.log(error.message)
        process.exit();
    }
}
export default connectDB;