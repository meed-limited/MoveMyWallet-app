import { useMemo } from "react";

import { useNetwork } from "wagmi";

import { isProdEnv, SUPPORTED_CHAIN } from "../data/constant";

export function useSuportedChains() {
    const { chain } = useNetwork();

    return useMemo(() => {
        if (chain) {
            if (
                (isProdEnv && SUPPORTED_CHAIN.mainnet.includes(chain.id)) ||
                (!isProdEnv && SUPPORTED_CHAIN.testnet.includes(chain.id))
            ) {
                return true;
            } else return false;
        }
        return false;
    }, [chain]);
}
