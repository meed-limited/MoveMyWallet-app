import { BigNumber } from "ethers";

import { useReadContract } from "./useReadContract";
import { useWriteContract } from "./useWriteContract";

export function useMultipleApprovals() {
    const { checkTokenAllowance, checkNftAllowance } = useReadContract();
    const { approveToken, approveNft } = useWriteContract();

    const multipleApprove = async (addresses: string[], numbers: (string | number | BigNumber)[]) => {
        const numOfERC20 = Number(numbers[1]);
        const uniqueAddresses = [...new Set(addresses.slice(numOfERC20))];

        try {
            for (let i = 0; i < addresses.length; i++) {
                if (i < numOfERC20) {
                    const toAllow = numbers[i + 4] as BigNumber;
                    const currentAllowance = await checkTokenAllowance(addresses[i]);

                    if (Number(currentAllowance) < Number(toAllow)) {
                        await approveToken(addresses[i], toAllow);
                    }
                } else {
                    const isApproved = await checkNftAllowance(uniqueAddresses[i - numOfERC20]);
                    if (!isApproved) {
                        await approveNft(uniqueAddresses[i - numOfERC20]);
                    }
                }
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    return multipleApprove;
}
