import { ethereum, goerli, bnb, bnb_test, mumbai, polygon } from "../data/networks";

export const getExplorer = (chainId: number) => {
    switch (chainId) {
        case 1:
            return ethereum.blockExplorers?.default.url;
        case 5:
            return goerli.blockExplorers?.default.url;
        case 56:
            return bnb.blockExplorers?.default.url;
        case 97:
            return bnb_test.blockExplorers?.default.url;
        case 137:
            return polygon.blockExplorers?.default.url;
        case 80001:
            return mumbai.blockExplorers?.default.url;
        default:
            return ethereum.blockExplorers?.default.url;
    }
};
