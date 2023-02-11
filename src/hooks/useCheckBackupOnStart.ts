import { useCallback } from "react";

import { useMongoDB } from "./useMongoDB";
import { useUserData } from "../context/UserContextProvider";
import { toHexString } from "../utils/format";
import { openNotification } from "../utils/notifications";

export const useCheckBackupOnStart = () => {
    const { address, chainId, setDisplayPaneMode } = useUserData();
    const { findBundle } = useMongoDB();

    const checkIfBackupOnStart = useCallback(async () => {
        const result = await findBundle(address as string);

        if (result) {
            const title = "Bundle Recovered";
            const msg = "You have an unsent bundle from your previous session. Finish your transfer to avoid any loss.";
            openNotification("info", title, msg);
            setDisplayPaneMode("transfer");
            if (window.ethereum && chainId !== result.chainId) {
                window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: toHexString(result.chainId) }],
                });
            }
            return {
                tokenId: result.tokenId,
                salt: result.salt,
                addresses: result.addresses,
                numbers: result.numbers,
            };
        } else return undefined;
    }, [address, chainId, findBundle, setDisplayPaneMode]);

    return { checkIfBackupOnStart };
};
