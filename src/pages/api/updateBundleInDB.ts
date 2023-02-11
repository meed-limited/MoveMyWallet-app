import { NextApiRequest, NextApiResponse } from "next";

import BundleSchema from "../../data/models/bundleSchema";
import { connectToDb, disconnectFromDb } from "../../utils/connectToMongoDb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(`UPDATING BUNDLE IN MONGO DB...`);
        const { data }: { data: AssemblyEventData } = req.body;

        if (!data) {
            return res.status(500).json({ error: "data is not defined" });
        }

        const mongodbUri = process.env.MONGODB_URI;

        if (!mongodbUri) {
            return res.status(500).json({ error: "MONGODB_URI is not defined" });
        }

        await connectToDb(mongodbUri);

        const newBundle = new BundleSchema({
            addresses: data.addresses,
            blockHash: data.blockHash,
            blockNumber: data.blockNumber,
            chainId: data.chainId,
            bundleDate: new Date(Date.now()).toLocaleString(),
            numbers: data.numbers,
            ownerOf: data.ownerOf,
            salt: data.salt,
            tokenId: data.tokenId,
            transactionHash: data.transactionHash,
        });
        await newBundle.save();

        disconnectFromDb();
        return res.status(200).json({ success: true, message: "Data uploaded successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Error uploading data" });
    }
};

export default handler;
