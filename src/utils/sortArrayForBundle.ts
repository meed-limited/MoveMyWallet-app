import { formatBigNumber } from "./format";

export const sortArrayForBundle = (tokens: Token[], NFTs: NFTinDB[]): BundleArrays => {
    const ERC20s = tokens || [];
    const ERC721s = (NFTs || []).filter((nft) => nft.contract_type === "ERC721");
    const ERC1155s = (NFTs || []).filter((nft) => nft.contract_type === "ERC1155");

    const addressesArray = [
        ...ERC20s.map((token) => token.token_address),
        ...ERC721s.map((nft) => nft.token_address),
        ...ERC1155s.map((nft) => nft.token_address),
    ];

    const numbersArray = [
        0,
        ERC20s.length,
        ERC721s.length,
        ERC1155s.length,
        ...ERC20s.map((token) => formatBigNumber(token.balance, token.decimals)),
        ...ERC721s.map((nft) => nft.token_id),
        ...ERC1155s.map((nft) => nft.token_id),
        ...ERC1155s.map((nft) => nft.amount || 0),
    ];

    return {
        addressesArray,
        numbersArray,
    };
};
