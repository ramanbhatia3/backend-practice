import mongoose from "mongoose"

const connectDB = async () => {
    const url = process.env.MONGO_URL

    if (!url){
        throw new Error("MongoDB URL is not defined in enviornment variables")
    }

    const connection = await mongoose.connect(url)

    console.log(`MongoDB Connected: ${connection.connection.host}`)
}

export default connectDB