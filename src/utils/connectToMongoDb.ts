import mongoose from "mongoose";

// Mongoose status = { 0: disconnected, 1: connected, 2: connecting, 3: disconnecting }

const connectToDb = async (mongodbUri: string) => {
    try {
        await mongoose.connect(mongodbUri);
        mongoose.set("strictQuery", false);
        console.debug("Connected to MongoDB");
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
        throw new Error("Could not connect to database");
    }
};

const disconnectFromDb = () => {
    try {
        mongoose.disconnect();
        console.debug("Disconnected from MongoDB");
    } catch (err) {
        console.error(`Error disconnecting from MongoDB: ${err}`);
        throw new Error("Could not disconnect from database");
    }
};

export { connectToDb, disconnectFromDb };
