import { useState } from "react";

import { useIPFS } from "./useIPFS";

/**
 * This is a hook that loads the NFT metadata in case it doesn't alreay exist
 * If metadata is missing, the object is replaced with a reactive object that updatees when the data becomes available
 * The hook will retry until request is successful (with OpenSea, for now)
 */
export const useVerifyMetadata = () => {
    const { resolveLink } = useIPFS();
    const [results, setResults] = useState<any>();

    /**
     * Fet Metadata  from NFT and Cache Results
     * @param {object} NFT
     * @returns NFT
     */
    function verifyMetadata(NFT: NFTinDB) {
        if (NFT.metadata) return NFT;
        getMetadata(NFT);
        return results?.[NFT.token_uri] ? results?.[NFT.token_uri] : NFT;
    }

    /**
     * Extract Metadata from NFT,
     *  Fallback: Fetch from URI
     * @param {object} NFT
     * @returns void
     */
    async function getMetadata(NFT: NFTinDB) {
        if (!NFT.token_uri || !NFT.token_uri.includes("://")) {
            console.log("getMetadata() Invalid URI", { URI: NFT.token_uri, NFT });
            return;
        }
        fetch(NFT.token_uri)
            .then((res) => res.json())
            .then((metadata) => {
                if (!metadata) {
                    console.error("useVerifyMetadata.getMetadata() No Metadata found on URI:", {
                        URI: NFT.token_uri,
                        NFT,
                    });
                } else if (metadata?.detail && metadata.detail.includes("Request was throttled")) {
                    console.warn(
                        "useVerifyMetadata.getMetadata() Bad Result for:" + NFT.token_uri + "  Will retry later",
                        {
                            results,
                            metadata,
                        }
                    );
                    setTimeout(function () {
                        getMetadata(NFT);
                    }, 1000);
                } //Handle Opensea's {detail: "Request was throttled. Expected available in 1 second."}
                else {
                    setMetadata(NFT, metadata);
                    console.log("getMetadata() Late-load for NFT Metadata " + NFT.token_uri, { metadata });
                }
            })
            .catch((err) => {
                console.error("useVerifyMetadata.getMetadata() Error Caught:", {
                    err,
                    NFT,
                    URI: NFT.token_uri,
                });
            });
    }

    /**
     * Update NFT Object
     * @param {object} NFT
     * @param {object} metadata
     */
    function setMetadata(NFT: NFTinDB, metadata: NftMetadata) {
        NFT.metadata = metadata;
        if (metadata?.image) NFT.image = resolveLink(metadata.image);
        if (metadata && !results[NFT.token_uri]) setResults({ ...results, [NFT.token_uri]: NFT });
    }

    return { verifyMetadata };
};
