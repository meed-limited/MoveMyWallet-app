import { useCallback, useEffect, useState } from "react";
import { useUserData } from "../context/UserContextProvider";
import { URL } from "../data/constant";

export const useSpamFilter = () => {
    const { userNFTs, address, chainId } = useUserData();
    const [nfts, setNfts] = useState<Nfts>({ nfts: [], total: 0 });

    const getAllCollectionAddresses = (nfts: NFTinDB[]) => {
        return Array.from(new Set(nfts.map((nft) => nft.token_address)));
    };

    const getAllSpamCollection = async (collections: string[]): Promise<string[]> => {
        const res = await fetch(`${URL}api/getSpamContract/`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                account: address,
                chainId: chainId,
                contracts: collections,
            }),
        });

        const data = await res.json();
        return data.data;
    };

    const removeSpamNFT = useCallback(async () => {
        const uniqueAddress = getAllCollectionAddresses(userNFTs?.nfts);
        const spams = await getAllSpamCollection(uniqueAddress);

        if (spams.length > 0) {
            const filteredNfts = userNFTs?.nfts.filter((nft) => !spams.includes(nft.token_address));
            setNfts({ nfts: filteredNfts, total: filteredNfts.length });
        } else setNfts(userNFTs);
    }, []);

    useEffect(() => {
        removeSpamNFT();
    }, []);

    return { nfts };
};
