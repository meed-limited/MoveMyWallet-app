import { NextApiRequest, NextApiResponse } from "next";

import BundleSchema from "../../data/models/bundleSchema";
import { connectToDb, disconnectFromDb } from "../../utils/connectToMongoDb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(`DELETING BUNDLE IN MONGO DB...`);
        const { tokenId }: { tokenId: string } = req.body;

        if (!tokenId) {
            return res.status(500).json({ error: "tokenId is not defined" });
        }

        const mongodbUri = process.env.MONGODB_URI;

        if (!mongodbUri) {
            return res.status(500).json({ error: "MONGODB_URI is not defined" });
        }

        await connectToDb(mongodbUri);

        const bundleToDelete = await BundleSchema.find({ tokenId: tokenId });
        await bundleToDelete[0].remove();

        disconnectFromDb();
        return res.status(200).json({ success: true, message: "Bundle removed successfully from DB" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Error deleting data" });
    }
};

export default handler;
