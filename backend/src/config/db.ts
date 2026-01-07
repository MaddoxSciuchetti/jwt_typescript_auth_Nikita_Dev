import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("sucessfully connected");
    } catch (error) {
        console.log("Could not connect", error);
        process.exit(1);
        
    }
}

export default connectToDatabase;