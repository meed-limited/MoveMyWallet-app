import { URL } from "../data/constant";

export const useFetchCollectionNFTs = () => {
    const fetchNFTs = async (address: string, chainId: number, selected: string) => {
        const res: Response = await fetch(`${URL}api/getNftFromCollection`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                account: address,
                chainId: chainId,
                collection: selected,
            }),
        });
        const data = await res.json();
        return data.data;
    };

    return { fetchNFTs };
};
