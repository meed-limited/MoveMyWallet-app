import { useState } from "react";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import { getContractAddress, ABI } from "helpers/constant";
import AddressInput from "./AddressInput";
import { destroyBackupBundle } from "helpers/findBackupBundle";
import { openNotification } from "helpers/notifications";
import { getExplorer } from "helpers/networks";
import { Button } from "antd";
import { FileSearchOutlined, SendOutlined } from "@ant-design/icons";

const styles = {
  content: {
    display: "flex",
    alignItems: "center",
    margin: "auto",
    height: "300px",
    width: "90%",
    color: "white",
    background: "black",
    borderRadius: "20px"
  },
  text: {
    textAlign: "center",
    margin: "auto",
    marginBottom: "15px",
    fontSize: "30px",
    letterSpacing: "1px",
    paddingBottom: "20px"
  },
  transferButton: {
    width: "40%",
    height: "40px",
    border: "none",
    textAlign: "center",
    letterSpacing: "1px",
    margin: "auto",
    background: "white",
    color: "black",
    marginTop: "20px",
    fontWeight: 700
  }
};

const Transfer = ({ tokenData, onFinishSelection, getAddressFromTransfer, setWaiting }) => {
  const { chainId } = useMoralis();
  const [receiverToSend, setReceiver] = useState(null);
  const contractAddress = getContractAddress(chainId);

  const setAddress = (value) => {
    setReceiver(value);
    getAddressFromTransfer(value);
  };

  const handleTransfer = async () => {
    setWaiting(true);

    const sendOptions = {
      contractAddress: contractAddress,
      functionName: "burn",
      abi: ABI.abi,
      params: {
        _to: receiverToSend,
        _tokenId: tokenData[0],
        _salt: tokenData[1],
        _addresses: tokenData[2],
        _numbers: tokenData[3]
      }
    };

    try {
      const transaction = await Moralis.executeFunction(sendOptions);
      const receipt = await transaction.wait();
      let link = `${getExplorer(chainId)}tx/${receipt.transactionHash}`;
      let title = "Assets unpacked!";
      let msg = (
        <>
          Your assets has been succesfully transfered!
          <br></br>
          <a href={link} target='_blank' rel='noreferrer noopener'>
            View in explorer: &nbsp;
            <FileSearchOutlined style={{ transform: "scale(1.3)", color: "purple" }} />
          </a>
        </>
      );
      destroyBackupBundle(tokenData[0]);
      openNotification("success", title, msg);
      setWaiting(false);
      onFinishSelection();
    } catch (error) {
      let title = "Unexpected error";
      let msg = "Oops, something went wrong while transfering your assets. Please, try again.";
      openNotification("error", title, msg);
      setWaiting(false);
      console.log(error);
    }
  };

  return (
    <div style={styles.content}>
      <div style={{ margin: "auto", width: "80%" }}>
        <p style={styles.text}>Transfer my assets</p>
        <AddressInput autoFocus placeholder='Receiver' onChange={setAddress} />
        <div style={{ marginTop: "20px", display: "flex", flex: "inline-flex" }}>
          <Button style={styles.transferButton} shape='round' onClick={handleTransfer}>
            TRANSFER <SendOutlined style={{ padding: "0 20px", fontSize: "18px" }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
