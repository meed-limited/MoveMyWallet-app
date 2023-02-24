export const useIPFS = () => {
    const resolveLink = (url: string) => {
        if (!url || !url.includes("ipfs://")) return url;
        // return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
        return url.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/");
        // return url.replace("ipfs://", "https://ipfs.fleek.co/ipfs/"); // Not working
        // return url.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
    };

    return { resolveLink };
};
