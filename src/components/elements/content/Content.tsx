import { useState, useEffect, FC, SetStateAction, useCallback } from "react";

import { StepsPane, Verification } from "..";
import { useUserData } from "../../../context/UserContextProvider";
import { useSuportedChains, useCheckBackupOnStart } from "../../../hooks";
import { BundlePane, NFTSelection, StartPane, TokenSelection, Transfer, Done } from "../../templates";

const Content: FC = () => {
    const { isConnected, displayPaneMode, resetDisplayPane } = useUserData();
    const isSupportedChain = useSuportedChains();
    const { checkIfBackupOnStart } = useCheckBackupOnStart();

    const [tokensToTransfer, setTokensToTransfer] = useState<Token[]>([]);
    const [NFTsToTransfer, setNFTsToTransfer] = useState<NFTinDB[]>([]);
    const [bundleDataToTransfer, setBundleDataToTransfer] = useState<TokenData | undefined>();
    const [addressTotransfer, setAddressTotransfer] = useState("");

    const getAddressFromTransfer = (value: SetStateAction<string>) => {
        setAddressTotransfer(value);
    };

    const checkOnStart = useCallback(async () => {
        const data = await checkIfBackupOnStart();
        setBundleDataToTransfer(data);
    }, []);

    useEffect(() => {
        if (isConnected) {
            checkOnStart();
        }
    }, [isConnected, checkOnStart]);

    const onReset = () => {
        setTokensToTransfer([]);
        setNFTsToTransfer([]);
        resetDisplayPane();
    };

    return (
        <>
            <div className="steps-pane">
                <StepsPane tokensToTransfer={tokensToTransfer} NFTsToTransfer={NFTsToTransfer} />
            </div>

            <div className="display-pane">
                <div className="pane">
                    {isConnected && isSupportedChain ? (
                        <>
                            {displayPaneMode === "start" && <StartPane />}
                            {displayPaneMode === "tokens" && (
                                <TokenSelection
                                    tokensToTransfer={tokensToTransfer}
                                    setTokensToTransfer={setTokensToTransfer}
                                />
                            )}
                            {displayPaneMode === "nfts" && (
                                <NFTSelection NFTsToTransfer={NFTsToTransfer} setNFTsToTransfer={setNFTsToTransfer} />
                            )}
                            {displayPaneMode === "bundle" && (
                                <BundlePane
                                    onReset={onReset}
                                    setBundleDataToTransfer={setBundleDataToTransfer}
                                    tokensToTransfer={tokensToTransfer}
                                    NFTsToTransfer={NFTsToTransfer}
                                />
                            )}
                            {displayPaneMode === "transfer" && (
                                <Transfer
                                    bundleDataToTransfer={bundleDataToTransfer}
                                    getAddressFromTransfer={getAddressFromTransfer}
                                />
                            )}
                            {displayPaneMode === "done" && <Done address={addressTotransfer} onReset={onReset} />}
                        </>
                    ) : (
                        <Verification />
                    )}
                </div>
            </div>
        </>
    );
};

export default Content;
