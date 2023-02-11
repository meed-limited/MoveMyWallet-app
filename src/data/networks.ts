import { Chain } from "wagmi";

export const ethereum: Chain = {
    id: 1,
    name: "Ethereum",
    network: "Ethereum",
    nativeCurrency: {
        decimals: 18,
        name: "ETH",
        symbol: "ETH",
    },
    rpcUrls: {
        default: { http: [""] },
        public: { http: [""] },
    },
    blockExplorers: {
        default: { name: "", url: "https://etherscan.io/" },
    },
    testnet: false,
};

export const goerli: Chain = {
    id: 5,
    name: "Goerli",
    network: "Goerli",
    nativeCurrency: {
        decimals: 18,
        name: "ETH",
        symbol: "ETH",
    },
    rpcUrls: {
        default: { http: [""] },
        public: { http: [""] },
    },
    blockExplorers: {
        default: { name: "", url: "https://goerli.etherscan.io/" },
    },
    testnet: true,
};

export const bnb: Chain = {
    id: 56,
    name: "BNB_Chain",
    network: "BNB_Chain",
    nativeCurrency: {
        decimals: 18,
        name: "BNB",
        symbol: "BNB",
    },
    rpcUrls: {
        default: { http: [""] },
        public: { http: [""] },
    },
    blockExplorers: {
        default: { name: "", url: "https://bscscan.com/" },
    },
    testnet: false,
};

export const bnb_test: Chain = {
    id: 97,
    name: "BNB_Testnet",
    network: "BNB_Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "BNB",
        symbol: "BNB",
    },
    rpcUrls: {
        default: { http: [""] },
        public: { http: [""] },
    },
    blockExplorers: {
        default: { name: "", url: "https://testnet.bscscan.com/" },
    },
    testnet: true,
};

export const polygon: Chain = {
    id: 137,
    name: "Polygon network",
    network: "Polygon",
    nativeCurrency: {
        decimals: 18,
        name: "MATIC",
        symbol: "MATIC",
    },
    rpcUrls: {
        default: { http: [""] },
        public: { http: [""] },
    },
    blockExplorers: {
        default: { name: "", url: "https://polygonscan.com/" },
    },
    testnet: false,
};

export const mumbai: Chain = {
    id: 80001,
    name: "Mumbai Testnet",
    network: "Mumbai",
    nativeCurrency: {
        decimals: 18,
        name: "MATIC",
        symbol: "MATIC",
    },
    rpcUrls: {
        default: { http: [""] },
        public: { http: [""] },
    },
    blockExplorers: {
        default: { name: "", url: "https://mumbai.polygonscan.com/" },
    },
    testnet: true,
};
