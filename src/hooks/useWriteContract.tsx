import { FileSearchOutlined } from "@ant-design/icons";
import { BigNumber, providers, Contract } from "ethers";

import { MoveMyWallet } from "../../types/MoveMyWallet";
import { useUserData } from "../context/UserContextProvider";
import { MMW_ABI, ERC20_ABI, NFT_ABI } from "../data/abis";
import { getContractAddress } from "../data/constant";
import { getExplorer } from "../utils/getExplorerByChain";
import { openNotification } from "../utils/notifications";

export const useWriteContract = () => {
    const { address, chainId } = useUserData();
    const mmw = getContractAddress(chainId);

    const provider = new providers.Web3Provider(window?.ethereum as any, "any");
    const signer = provider.getSigner();
    const mmwInstance = new Contract(mmw, MMW_ABI, signer) as MoveMyWallet;

    /* Set Token Allowance:
     ***************************/
    const approveToken = async (token: string, allowance: BigNumber) => {
        const tokenInstance = new Contract(token, ERC20_ABI, signer) as MoveMyWallet;

        try {
            const tx = await tokenInstance.approve(mmw, allowance);
            await tx.wait(2);
            const value = parseInt(allowance.toString()) / 10 ** 18;
            const title = "Token Approval set";
            const msg = `Allowance succesfully set to ${value}.`;
            openNotification("success", title, msg);
        } catch (error: any) {
            console.error(error.reason);
            const title = "Token Approval denied";
            const msg = ` Something went wrong while setting the allowance. \n 
            Reason: ${error.reason}`;
            openNotification("error", title, msg);
        }
    };

    /* Set Token Allowance:
     ***************************/
    const approveNft = async (nft: string) => {
        const nftInstance = new Contract(nft, NFT_ABI, signer) as MoveMyWallet;
        try {
            const tx = await nftInstance.setApprovalForAll(mmw, true);
            await tx.wait(2);
            const title = "NFT Approval set";
            const msg = `Allowance succesfully set.`;
            openNotification("success", title, msg);
        } catch (error: any) {
            console.error(error.reason);
            const title = "NFT Approval denied";
            const msg = ` Something went wrong while setting the allowance.\n 
            Reason: ${error.reason}`;
            openNotification("error", title, msg);
        }
    };

    const executeBundle = async (addresses: string[], numbers: (string | number)[]) => {
        try {
            const tx = await mmwInstance.safeMint(address as string, addresses, numbers);
            const receipt = await tx.wait(2);
            const eventArr = receipt.events;

            if (eventArr) {
                const assemblyEvent = eventArr.filter((event) => event.event === "AssemblyAsset");

                const data: AssemblyEventData = {
                    addresses: assemblyEvent[0].args?.addresses,
                    blockHash: assemblyEvent[0].blockHash,
                    blockNumber: Number(assemblyEvent[0].blockNumber),
                    chainId: chainId,
                    numbers: assemblyEvent[0].args?.numbers.map((item: BigNumber) => item.toString()),
                    ownerOf: assemblyEvent[0].args?.firstHolder.toLowerCase(),
                    salt: Number(assemblyEvent[0].args?.salt),
                    tokenId: assemblyEvent[0].args?.tokenId.toString(),
                    transactionHash: assemblyEvent[0].transactionHash,
                };

                const title = "Bundle Created";
                const link = `${getExplorer(chainId)}tx/${receipt.transactionHash}`;
                const msg = (
                    <>
                        Your bundle has been successfully created!
                        <br></br>
                        <a href={link} target="_blank" rel="noreferrer noopener">
                            View in explorer: &nbsp;
                            <FileSearchOutlined style={{ transform: "scale(1.3)", color: "purple" }} />
                        </a>
                    </>
                );
                openNotification("success", title, msg);
                return {
                    success: true,
                    data,
                };
            }
        } catch (error: any) {
            console.error(error.reason);
            const title = "Unexpected error";
            const msg = `Oops, something went wrong while bundling your assets. \n 
            Reason: ${error.reason}`;
            openNotification("error", title, msg);
            return { success: false, data: null };
        }
    };

    const executeTransfer = async (
        receiver: string,
        tokenId: string,
        salt: number,
        addresses: string[],
        numbers: (string | number)[]
    ) => {
        try {
            const tx = await mmwInstance.burn(receiver, tokenId, salt, addresses, numbers);
            const receipt = await tx.wait(2);

            const link = `${getExplorer(chainId)}tx/${receipt.transactionHash}`;
            const title = "Assets unpacked!";
            const msg = (
                <>
                    Your assets has been succesfully transfered!
                    <br></br>
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        View in explorer: &nbsp;
                        <FileSearchOutlined style={{ transform: "scale(1.3)", color: "purple" }} />
                    </a>
                </>
            );
            openNotification("success", title, msg);
            return { success: true, data: null };
        } catch (error: any) {
            console.error(error.reason);
            const title = "Unexpected error";
            const msg = `Oops, something went wrong while transfering your assets. \n 
            Reason: ${error.reason}`;
            openNotification("error", title, msg);
            return { success: false, data: null };
        }
    };

    return {
        approveToken,
        approveNft,
        executeBundle,
        executeTransfer,
    };
};
