import { Chain } from "wagmi";

export const ethereum: Chain = {
    id: 1,
    name: "Ethereum",
    network: "Ethereum",
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ["https://ethereum.publicnode.com"] },
        public: { http: ["https://cloudflare-eth.com"] },
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
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ["https://goerli.blockpi.network/v1/rpc/public"] },
        public: { http: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"] },
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
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ["https://bsc-dataseed1.binance.org"] },
        public: { http: ["https://bsc-dataseed.binance.org"] },
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
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ["https://data-seed-prebsc-2-s1.binance.org:8545"] },
        public: { http: ["https://data-seed-prebsc-1-s1.binance.org:8545"] },
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
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ["https://polygon-rpc.com"] },
        public: { http: ["https://poly-rpc.gateway.pokt.network"] },
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
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ["https://rpc.ankr.com/polygon_mumbai"] },
        public: { http: ["https://rpc-mumbai.maticvigil.com"] },
    },
    blockExplorers: {
        default: { name: "", url: "https://mumbai.polygonscan.com/" },
    },
    testnet: true,
};

export const networks = [ethereum, goerli, bnb, bnb_test, polygon, mumbai];
