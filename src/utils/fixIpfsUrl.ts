export const fixIpfsUrl = (url: string): string => {
    const startIndex = url.indexOf("https://") + "https://".length;
    const endIndex = url.indexOf("/ipfs/");
    const ipfsHash = url.substring(startIndex, endIndex);
    return url.replace(`https://${ipfsHash}/ipfs/`, "https://ipfs.moralis.io:2053/ipfs/");
};
