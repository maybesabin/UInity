import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("Connected to DB ✅")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectToDb