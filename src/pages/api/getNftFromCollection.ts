import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";

const getMoralisChain = (chainId: number) => {
    switch (chainId) {
        case 1:
            return EvmChain.ETHEREUM;
        case 5:
            return EvmChain.GOERLI;
        case 56:
            return EvmChain.BSC;
        case 97:
            return EvmChain.BSC_TESTNET;
        case 137:
            return EvmChain.POLYGON;
        case 80001:
            return EvmChain.MUMBAI;
        default:
            return EvmChain.ETHEREUM;
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

    if (!MORALIS_API_KEY) {
        return res.status(400).json({ success: false, message: "MORALIS_API_KEY is not defined" });
    }

    const { account, chainId, collection } = req.body;

    if (!account || !chainId || !collection) {
        return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const moralisChain = getMoralisChain(chainId);

    if (!moralisChain) {
        return res.status(400).json({ success: false, message: "moralisChain missing" });
    }

    // Start Moralis
    if (!Moralis.Core.isStarted) {
        await Moralis.start({
            apiKey: MORALIS_API_KEY,
        });
    }

    try {
        console.log(`REQUEST NFT FOR COLLECTION ${collection}`);

        // Fetch user NFTs
        const tx = await Moralis.EvmApi.nft.getWalletNFTs({
            address: account,
            chain: moralisChain,
            tokenAddresses: [collection],
            disableTotal: false,
            normalizeMetadata: true,
        });

        let nfts: any[] = [];
        const nfts_1 = tx.raw.result;
        const total = tx.raw.total;
        nfts.push(nfts_1);
        nfts.flat();

        if (total && total > 100) {
            let currentTx = tx;
            for (let i = 0; i < Math.min(total, 500) / 100 - 1; i++) {
                const nextTx = await currentTx.next();
                nfts.push(nextTx.raw.result);
                currentTx = nextTx;
            }
        }

        nfts = nfts.flat();

        res.status(200).json({
            success: true,
            message: "Moralis data fetched successfully!",
            data: nfts,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "An error occured while updating the DB!",
            data: null,
        });
    }
};

export default handler;
