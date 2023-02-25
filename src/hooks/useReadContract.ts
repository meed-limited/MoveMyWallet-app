import { useEffect, useState } from "react";

import { Contract, providers } from "ethers";

import { useUserData } from "../context/UserContextProvider";
import { ERC20_ABI, NFT_ABI } from "../data/abis";
import { getContractAddress } from "../data/constant";

export const useReadContract = () => {
    const { address, chainId } = useUserData();
    const [provider, setProvider] = useState<providers.Web3Provider | undefined>(undefined);
    const mmw = getContractAddress(chainId);

    useEffect(() => {
        setProvider(new providers.Web3Provider(window?.ethereum as any, "any"));
    }, [chainId]);

    /* Check if existing allowance of ERC20 token :
     ***********************************************/
    const checkTokenAllowance = async (token: string) => {
        if (!provider || !mmw) return 0;

        const tokenInstance: Contract = new Contract(token, ERC20_ABI, provider);

        try {
            const allowance = await tokenInstance.allowance(address, mmw);
            return allowance;
        } catch (error: any) {
            console.error(error.reason ?? error.message);
            return 0;
        }
    };

    /* Check if existing allowance of NFT 1155 :
     ***********************************************/
    const checkNftAllowance = async (nft: string) => {
        if (!provider || !mmw) return false;

        const nftInstance: Contract = new Contract(nft, NFT_ABI, provider);

        try {
            const allowance = await nftInstance.isApprovedForAll(address, mmw);
            return allowance;
        } catch (error: any) {
            console.error(error.reason ?? error.message);
            return false;
        }
    };

    return {
        checkTokenAllowance,
        checkNftAllowance,
    };
};
