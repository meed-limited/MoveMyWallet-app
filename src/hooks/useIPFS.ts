export const useIPFS = () => {
    const resolveLink = (url: string) => {
        if (!url || !url.includes("ipfs://")) return url;
        //return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
        return url.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/");
    };

    return { resolveLink };
};
