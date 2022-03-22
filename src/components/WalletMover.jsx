/*eslint no-dupe-keys: "Off"*/
import { useState, useEffect } from "react";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import AccountVerification from "components/Account/AccountVerification";
import ChainVerification from "components/Chains/ChainVerification";
import StartPane from "./DisplayPane/StartPane";
import StepsPane from "./StepsPane";
import TokenSelection from "./DisplayPane/TokenSelection";
import NFTSelection from "./DisplayPane/NFTSelection";
import BundlePane from "./DisplayPane/BundlePane";
import Transfer from "components/DisplayPane/TransferPane/Transfer";
import { openNotification } from "helpers/notifications";
import { findBackupBundle } from "helpers/findBackupBundle";
import { ABI, getContractAddress } from "helpers/constant";
import { Spin } from "antd";
import Done from "./DisplayPane/TransferPane/Done";
import AdminPane from "./AdminPane";

const styles = {
  content: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    height: "80vh",
    gap: "40px",
    margin: "0 20px 0 60px"
  },
  leftColumn: {
    flex: "1",
    display: "flex",
    height: "100%"
  },
  displayPane: {
    flex: "2"
  },
  pane: {
    background: "rgb(118,123,223)",
    background: "linear-gradient(315deg, rgba(69,75,205,1) 0%, rgba(159,161,198,0.4) 50%, rgba(223,223,228,0.3) 100%)",
    borderRadius: "20px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"
  }
};

function WalletMover({ setAdminAddress, isAdminPaneOpen, setIsAdminPaneOpen }) {
  const { account, isAuthenticated, chainId, user } = useMoralis();
  const contractAddress = getContractAddress(chainId);
  const [tokensToTransfer, setTokensToTransfer] = useState();
  const [NFTsToTransfer, setNFTsToTransfer] = useState();
  const [tokenData, setTokenData] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [displayPaneMode, setDisplayPaneMode] = useState("start");
  const [address, setAddress] = useState("");
  const [isSupportedChain, setIsSupportedChain] = useState("");

  const getAdminAddress = async () => {
    const readOptions = {
      contractAddress: contractAddress,
      functionName: "owner",
      abi: ABI.abi
    };

    try {
      const owner = await Moralis.executeFunction(readOptions);
      setAdminAddress(owner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminAddress();
    setIsAdminPaneOpen(false);
    setDisplayPaneMode("start");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isAuthenticated, user]);

  useEffect(() => {
    if (isAdminPaneOpen) {
      setDisplayPaneMode("admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminPaneOpen, account]);

  const getAddressFromTransfer = (value) => {
    setAddress(value);
  };

  useEffect(() => {
    if (account && isAuthenticated) {
      checkIfBackupOnStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isAuthenticated]);

  const checkIfBackupOnStart = () => {
    findBackupBundle(account, setTokenData).then((foundBackup) => {
      if (foundBackup) {
        setDisplayPaneMode("transfer");
        const title = "Bundle Recovered";
        let msg = "We found an unsent bundle from your previous session";
        openNotification("info", title, msg);
      }
    });
  };

  const onReset = () => {
    setTokensToTransfer();
    setNFTsToTransfer();
    setDisplayPaneMode("start");
  };

  return (
    <div style={styles.content}>
      <div style={styles.leftColumn}>
        <StepsPane
          tokensToTransfer={tokensToTransfer}
          NFTsToTransfer={NFTsToTransfer}
          displayPaneMode={displayPaneMode}
        />
      </div>
      <div style={styles.displayPane}>
        <div style={styles.pane}>
          <Spin style={{ borderRadius: "20px" }} spinning={waiting} size='large'>
            <AccountVerification />
            <ChainVerification setIsSupportedChain={setIsSupportedChain} />
            {isAuthenticated && isSupportedChain && (
              <>
                {displayPaneMode === "start" && <StartPane onStart={() => setDisplayPaneMode("tokens")} />}
                {displayPaneMode === "tokens" && (
                  <TokenSelection
                    onFinishSelection={() => setDisplayPaneMode("nfts")}
                    tokensToTransfer={tokensToTransfer}
                    setTokensToTransfer={setTokensToTransfer}
                  />
                )}
                {displayPaneMode === "nfts" && (
                  <NFTSelection
                    onFinishSelection={setDisplayPaneMode}
                    NFTsToTransfer={NFTsToTransfer}
                    setNFTsToTransfer={setNFTsToTransfer}
                  />
                )}
                {displayPaneMode === "bundle" && (
                  <BundlePane
                    onFinishSelection={setDisplayPaneMode}
                    onReset={onReset}
                    setTokenData={setTokenData}
                    tokensToTransfer={tokensToTransfer}
                    NFTsToTransfer={NFTsToTransfer}
                    setWaiting={setWaiting}
                  />
                )}
                {displayPaneMode === "transfer" && (
                  <Transfer
                    onFinishSelection={() => setDisplayPaneMode("done")}
                    tokenData={tokenData}
                    getAddressFromTransfer={getAddressFromTransfer}
                    setWaiting={setWaiting}
                  />
                )}
                {displayPaneMode === "done" && <Done address={address} />}
                {displayPaneMode === "admin" && <AdminPane setDisplayPaneMode={setDisplayPaneMode} setIsAdminPaneOpen={setIsAdminPaneOpen} />}
              </>
            )}
          </Spin>
        </div>
      </div>
    </div>
  );
}

export default WalletMover;
