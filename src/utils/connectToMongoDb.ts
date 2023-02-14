import mongoose from "mongoose";

// Mongoose status = { 0: disconnected, 1: connected, 2: connecting, 3: disconnecting }

const connectToDb = async (mongodbUri: string) => {
    if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
        try {
            await mongoose.connect(mongodbUri);
            mongoose.set("strictQuery", false);
            console.debug("Connected to MongoDB");
        } catch (err) {
            console.error(`Error connecting to MongoDB: ${err}`);
            throw err;
        }
    }
};

const disconnectFromDb = () => {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        try {
            mongoose.disconnect();
            console.debug("Disconnected from MongoDB");
        } catch (err) {
            console.error(`Error disconnecting from MongoDB: ${err}`);
            throw err;
        }
    }
};

export { connectToDb, disconnectFromDb };
