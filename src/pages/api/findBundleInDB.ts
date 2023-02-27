import { NextApiRequest, NextApiResponse } from "next";

import BundleSchema from "../../data/models/bundleSchema";
import { connectToDb, disconnectFromDb } from "../../utils/connectToMongoDb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const mongodbUri = process.env.MONGODB_URI;

    try {
        console.log(`RETRIEVING BUNDLE IN MONGO DB, IF ANY...`);
        const { address }: { address: string } = req.body;

        if (!address) {
            return res.status(500).json({ error: "address is not defined" });
        }

        if (!mongodbUri) {
            return res.status(500).json({ error: "MONGODB_URI is not defined" });
        }

        await connectToDb(mongodbUri);

        const result = await BundleSchema.find({ ownerOf: address.toLowerCase() });

        disconnectFromDb();
        return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: null });
    }
};

export default handler;
