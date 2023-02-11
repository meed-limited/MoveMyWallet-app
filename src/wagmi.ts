import { configureChains, createClient } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { isProdEnv } from "./data/constant";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
if (!alchemyApiKey) {
    throw new Error("NEXT_PUBLIC_ALCHEMY_API_KEY is not defined");
}

const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai, polygon, ...(isProdEnv ? [polygonMumbai] : [polygon])],
    [alchemyProvider({ apiKey: alchemyApiKey })]
);

export const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: "Move My wallet",
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                qrcode: true,
                version: "2",
                projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
            },
        }),
    ],
    provider,
    webSocketProvider,
});
