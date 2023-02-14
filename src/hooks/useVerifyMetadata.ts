import { useState } from "react";

import { useIPFS } from "./useIPFS";

export const useVerifyMetadata = () => {
    const { resolveLink } = useIPFS();
    const [results, setResults] = useState<Record<string, NFTinDB>>({});

    const verifyMetadata = (nft: NFTinDB) => {
        if (!nft.metadata && !nft.token_uri) return nft;

        const cachedMetadata = results[nft.token_uri];
        if (cachedMetadata) return cachedMetadata;

        fetchMetadata(nft);
        return nft;
    };

    const fetchMetadata = async (nft: NFTinDB) => {
        if (!nft.token_uri || !nft.token_uri.includes("://")) {
            console.log("Invalid URI", { URI: nft.token_uri, nft });
            return;
        }

        try {
            const res = await fetch(nft.token_uri);
            const metadata = await res.json();
            if (!metadata) {
                console.error("No Metadata found on URI:", { URI: nft.token_uri, nft });
            } else {
                updateNFT(nft, metadata);
            }
        } catch (err) {
            console.error("Error Caught:", { err, nft, URI: nft.token_uri });
        }
    };

    const updateNFT = (nft: NFTinDB, metadata: NftMetadata) => {
        nft.metadata = metadata;
        nft.image = metadata.image ? resolveLink(metadata.image) : nft.image;
        nft.name = metadata.name || nft.name;
        setResults({ ...results, [nft.token_uri]: nft });
    };

    return { verifyMetadata };
};
