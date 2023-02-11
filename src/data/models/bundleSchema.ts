import { Schema, model, models } from "mongoose";

import { isProdEnv } from "../constant";

const collectionName = isProdEnv ? process.env.MONGODB_COLLECTION : process.env.MONGODB_COLLECTION_TEST;

if (!collectionName) {
    throw new Error("MONGODB_COLLECTION or MONGODB_COLLECTION_TEST is not defined");
}

const bundleSchema = new Schema(
    {
        addresses: {
            type: [String],
            required: true,
            immutable: true,
        },
        blockHash: {
            type: String,
            required: true,
            immutable: true,
        },
        blockNumber: {
            type: Number,
            required: true,
            immutable: true,
        },
        chainId: {
            type: Number,
            required: true,
            immutable: true,
        },
        bundleDate: {
            type: String,
            required: true,
            immutable: true,
        },
        numbers: {
            type: [String],
            required: true,
            immutable: true,
        },
        ownerOf: {
            type: String,
            required: true,
            immutable: true,
        },
        salt: {
            type: Number,
            required: true,
            immutable: true,
        },
        tokenId: {
            type: String,
            required: true,
            immutable: true,
        },
        transactionHash: {
            type: String,
            required: true,
            immutable: true,
        },
    },
    {
        strict: true,
        strictQuery: false, // Turn off strict mode for query filters
    }
);

const BundleSchema = isProdEnv
    ? models.minted_bundles || model(collectionName, bundleSchema)
    : models.minted_bundles_test || model(collectionName, bundleSchema);

export default BundleSchema;
