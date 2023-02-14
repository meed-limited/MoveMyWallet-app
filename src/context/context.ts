import { createContext } from "react";

const UserContext = createContext<UserContext>({
    chainId: 0,
    isConnected: false,
    balances: { native: "0", token: [] },
    userNFTs: { nfts: [], total: 0 },
    collections: [],
    // eslint-disable-next-line
    syncWeb3: () => {},
    displayPaneMode: "start",
    // eslint-disable-next-line
    setDisplayPaneMode: () => {},
    // eslint-disable-next-line
    resetDisplayPane: () => {},
});

export default UserContext;
