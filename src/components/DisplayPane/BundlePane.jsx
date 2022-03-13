import { useState } from "react";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import { L3P_TOKEN_ADDRESS, ABI, getContractAddress } from "helpers/constant";
import cloneDeep from "lodash/cloneDeep";
import FeeSelector from "components/DisplayPane/FeeSelector";
import { checkERC20allowance, approveERC20contract, approveAll } from "helpers/approval";
import { saveBackupBundle } from "helpers/findBackupBundle";
import { openNotification } from "helpers/notifications";
import { getExplorer } from "helpers/networks";
import { Button } from "antd";
import { FileSearchOutlined, DownloadOutlined } from "@ant-design/icons";

const styles = {
  container: {
    background:
      "linear-gradient(315deg, rgb(69, 75, 205) 0%, rgba(159, 161, 198, 0.4) 50%, rgba(223, 223, 228, 0.3) 100%)",
    borderRadius: "20px",
    width: "90%",
    height: "100%",
    textAlign: "center",
    margin: "auto"
  },
  bundlePane: {
    display: "flex",
    flexDirection: "column",
    padding: "30px"
  },
  resetButton: {
    padding: "0px 30px",
    height: "30px",
    background: "white",
    border: 0,
    color: "black",
    fontSize: "15px",
    fontWeight: 600,
    margin: "20px 20px"
  },
  bundleButton: {
    padding: "5px 100px",
    height: "50px",
    background: "black",
    border: 0,
    color: "white",
    fontSize: "25px",
    fontWeight: 600,
    margin: "20px 20px"
  },
  showFee: {
    height: "40px",
    background: "#565bda",
    margin: "10px auto",
    borderRadius: "12px"
  }
};

const BundlePane = ({ setTokenData, tokensToTransfer, NFTsToTransfer, setWaiting, onFinishSelection, onReset }) => {
  const { chainId, account } = useMoralis();
  const [serviceFee, setServiceFee] = useState();
  const contractAddress = getContractAddress(chainId);
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, ABI.abi, provider);

  const sortArrayForBundle = () => {
    const addresses = [];
    const numbers = [];
    // the || operators prevent errors when tokensToTransfer or NFTsToTransfer are undefined
    const ERC20s = tokensToTransfer || [];
    const ERC721s = NFTsToTransfer?.filter((nft) => nft.contract_type === "ERC721") || [];
    const ERC1155s = NFTsToTransfer?.filter((nft) => nft.contract_type === "ERC1155") || [];

    addresses.push(...ERC20s.map((token) => token.token_address));
    addresses.push(...ERC721s.map((nft) => nft.token_address));
    addresses.push(...ERC1155s.map((nft) => nft.token_address));

    numbers.push(0);
    numbers.push(ERC20s.length);
    numbers.push(ERC721s.length);
    numbers.push(ERC1155s.length);
    numbers.push(...ERC20s.map((token) => token.balance.toString()));
    numbers.push(...ERC721s.map((nft) => nft.token_id));
    numbers.push(...ERC1155s.map((nft) => nft.token_id));
    numbers.push(...ERC1155s.map((nft) => nft.amount));

    return {
      addressesArray: addresses,
      numbersArray: numbers,
      nativeAmount: serviceFee.type === "native" ? serviceFee.amount * "1e18" : 0
    };
  };

  const ifServiceFeeInL3P = async () => {
    const currentAllowance = await checkERC20allowance(account, L3P_TOKEN_ADDRESS, contractAddress);
    if (currentAllowance < serviceFee.amount) {
      approveERC20contract(L3P_TOKEN_ADDRESS, serviceFee.amount, contractAddress);
    }
  };

  const bundleOptions = (addresses, numbers, nativeAmount) => ({
    contractAddress: contractAddress,
    functionName: "mint",
    abi: ABI.abi,
    params: {
      _to: account,
      _addresses: addresses,
      _numbers: numbers
    },
    msgValue: nativeAmount
  });

  const executeBundle = async () => {
    setWaiting(true);
    const { addressesArray, numbersArray, nativeAmount } = sortArrayForBundle();
    const clonedArray = cloneDeep(addressesArray);
    await approveAll(clonedArray, numbersArray, account, contractAddress);

    const sendOptions = bundleOptions(addressesArray, numbersArray, nativeAmount);

    if (serviceFee.type === "L3P") {
      await ifServiceFeeInL3P();
    }

    try {
      eventListener(addressesArray, numbersArray);
      const transaction = await Moralis.executeFunction(sendOptions);
      const receipt = await transaction.wait();
      console.log("Bundle successfully created");
      const title = "Bundle Created";
      let link = `${getExplorer(chainId)}tx/${receipt.transactionHash}`;
      let msg = (
        <>
          Your bundle has been successfully created!
          <br></br>
          <a href={link} target='_blank' rel='noreferrer noopener'>
            View in explorer: &nbsp;
            <FileSearchOutlined style={{ transform: "scale(1.3)", color: "purple" }} />
          </a>
        </>
      );
      openNotification("success", title, msg);
      setWaiting(false);
    } catch (error) {
      console.log(error);
      const title = "Error";
      const msg = "Something went wrong ),:  we weren't able to create your bundle";
      openNotification("error", title, msg);
      setWaiting(false);
    }
  };

  const eventListener = async (addressesArray, numbersArray) => {
    contract.once("AssemblyAsset", (firstHolder, tokenId, salt, addresses, numbers, event) => {
      let id = tokenId.toString();
      let nonce = parseInt(salt);
      setTokenData([id, nonce, addressesArray, numbersArray]);
      saveBackupBundle(account, [id, nonce, addressesArray, numbersArray]);
      onFinishSelection();
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.bundlePane}>
        <FeeSelector setServiceFee={setServiceFee} />

        <div style={styles.buttonDiv}>
          <Button style={styles.bundleButton} shape='round' onClick={executeBundle}>
            BUNDLE <DownloadOutlined style={{ marginLeft: "25px", transform: "scale(1.2)" }} />
          </Button>
        </div>
        <p>OR</p>
        <div style={styles.buttonDiv}>
          <Button style={styles.resetButton} shape='round' onClick={onReset}>
            Restart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BundlePane;
