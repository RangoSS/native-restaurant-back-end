import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_ULR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
};

export default connectDB;