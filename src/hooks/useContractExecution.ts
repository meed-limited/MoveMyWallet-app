import { useState } from "react";

import { useMongoDB } from "./useMongoDB";
import { useMultipleApprovals } from "./useMultipleApprovals";
import { useWriteContract } from "./useWriteContract";
import { useUserData } from "../context/UserContextProvider";

export const useContractExecution = () => {
    const { setDisplayPaneMode, syncWeb3 } = useUserData();
    const { executeBundle, executeTransfer } = useWriteContract();
    const { updateBundle } = useMongoDB();
    const multipleApprove = useMultipleApprovals();

    const [loading, setLoading] = useState<boolean>(false);

    const bundle = async (addresses: string[], numbers: (string | number)[]) => {
        setLoading(true);
        return multipleApprove(addresses, numbers)
            .then(async () => {
                const res = await executeBundle(addresses, numbers);
                if (res?.success) {
                    if (res?.data) {
                        updateBundle(res.data);
                    }
                    syncWeb3();
                    setLoading(false);
                    setDisplayPaneMode("transfer");
                    return res?.data;
                } else {
                    setLoading(false);
                    return null;
                }
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
                return null;
            });
    };

    const transfer = async (
        receiver: string,
        tokenId: string,
        salt: number,
        addresses: string[],
        numbers: (string | number)[]
    ) => {
        setLoading(true);

        try {
            const res = await executeTransfer(receiver, tokenId, salt, addresses, numbers);
            if (res.success) {
                syncWeb3();
                setLoading(false);
                setDisplayPaneMode("done");
                return true;
            } else {
                setLoading(false);
                return false;
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            return false;
        }
    };

    return { bundle, transfer, loading };
};
