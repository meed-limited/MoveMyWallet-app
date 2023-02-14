import React, { FC, ReactNode, useContext } from "react";

import { useAccount, useNetwork } from "wagmi";

import UserContext from "./context";
import { useDisplayPane } from "./useDisplayPane";
import { useWeb3Data } from "./useWeb3Data";

type Props = {
    children: ReactNode;
};

const UserDataProvider: FC<Props> = ({ children }) => {
    const { address, isConnected } = useAccount();
    const { balances, userNFTs, collections, syncWeb3 }: Web3Data = useWeb3Data();
    const { displayPaneMode, setDisplayPaneMode, resetDisplayPane } = useDisplayPane();
    const { chain } = useNetwork();
    const chainId: number = chain !== undefined ? chain.id : 1;

    return (
        <UserContext.Provider
            value={{
                address,
                chainId,
                isConnected,
                balances,
                userNFTs,
                collections,
                syncWeb3,
                displayPaneMode,
                setDisplayPaneMode,
                resetDisplayPane,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUserData = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserData must be used within UserDataProvider");
    }
    return context;
};

export { UserDataProvider, useUserData };
