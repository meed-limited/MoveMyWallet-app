import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { account, chainId, contracts } = req.body;

    if (!account || !chainId || !contracts) {
        return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

    if (!ALCHEMY_API_KEY) {
        return res.status(400).json({ success: false, message: "ALCHEMY_API_KEY is not defined" });
    }

    const URL_SPAM_ETHEREUM = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/getSpamContracts`;
    const URL_SPAM_POLYGON = `https://polygon-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/getSpamContracts`;

    const getSpamUrl = (chainId: 1 | 137): string | undefined => {
        switch (chainId) {
            case 1:
                return URL_SPAM_ETHEREUM;
            case 137:
                return URL_SPAM_POLYGON;
            default:
                return undefined;
        }
    };

    const url = getSpamUrl(chainId);
    if (url) {
        try {
            console.log(`REQUEST SPAM CONTRACTS CHECK FOR USER ${account}`);

            const spamContracts = await fetch(url, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            });
            const spams: string[] = await spamContracts.json();

            res.status(200).json({
                success: true,
                message: "Spam contracts successfully filtered!",
                data: spams,
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                success: false,
                message: "An error occured while fetching the spam contracts!",
                data: [],
            });
        }
    } else {
        res.status(200).json({
            success: true,
            message: "Spam contracts successfully filtered!",
            data: [],
        });
    }
};

export default handler;
