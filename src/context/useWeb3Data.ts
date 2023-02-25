import { useCallback, useEffect, useState } from "react";

import { useAccount, useNetwork } from "wagmi";

import { URL } from "../data/constant";

export const useWeb3Data = (): Web3Data => {
    const { address } = useAccount();
    const { chain } = useNetwork();

    const [balances, setBalances] = useState<UserBalances>({ native: "0", token: [] });
    const [userNFTs, setUserNFTs] = useState<Nfts>({ nfts: [], total: 0 });
    const [collections, setCollections] = useState<Collections>([]);

    const fetchMoralisData = async () => {
        const res: Response = await fetch(`${URL}api/getMoralisData`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                account: address,
                chainId: chain?.id,
            }),
        });
        const data = await res.json();

        setUserNFTs(data?.data?.userNfts);
        setCollections(data?.data?.collections);
        setBalances({
            native: data?.data?.nativeBalance,
            token: data?.data?.tokenBalance,
        });
    };

    const syncWeb3 = useCallback(() => {
        if (address && chain) {
            fetchMoralisData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, chain]);

    useEffect(() => {
        if (address && chain?.id) {
            syncWeb3();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, chain?.id]);

    return {
        balances,
        userNFTs,
        collections,
        syncWeb3,
    };
};
