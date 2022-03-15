import { useState } from "react";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import { openNotification } from "helpers/notifications";
import { Button, Input } from "antd";
import { ABI, getContractAddress } from "helpers/constant";
import AddressInput from "./DisplayPane/TransferPane/AddressInput";

const styles = {
  container: {
    background: "black",
    borderRadius: "20px",
    width: "80%",
    textAlign: "center",
    margin: "auto",
    padding: "30px 0"
  },
  title: {
    color: "white",
    fontWeight: 600,
    fontSize: "30px",
    marginBottom: "10px"
  },
  text: {
    color: "black",
    fontSize: "20px",
    marginTop: "10px"
  },
  adminButton: {
    height: "30px",
    textAlign: "center",
    fontWeight: "400",
    fontSize: "13px",
    border: "none",
    background: "white",
    color: "black",
    fontFamily: "Sora, sans-serif"
  }
};

const AdminPane = ({ setDisplayPaneMode, setIsAdminPaneOpen }) => {
  const { chainId } = useMoralis();
  const contractAddress = getContractAddress(chainId);
  const [ethAmount, setEthAmount] = useState();
  const [L3PAmount, setL3PAmount] = useState();
  const [address, setAddress] = useState(null);
  const [IPFSurl, setIPFSurl] = useState("");
  const [adminAddress, setAdminAddress] = useState(null);

  const handleBackClic = () => {
    setDisplayPaneMode("start");
    setIsAdminPaneOpen(false);
  };

  const setEthFee = async () => {
    if (ethAmount && ethAmount >= 0) {
      const nativeAmount = (ethAmount * "1e18").toString();

      const sendOptions = {
        contractAddress: contractAddress,
        functionName: "setFeeETH",
        abi: ABI.abi,
        params: {
          _newEthFee: nativeAmount
        }
      };

      try {
        await Moralis.executeFunction(sendOptions);
        let title = "All set!";
        let msg = "ETH fee set successfully.";
        openNotification("success", title, msg);
      } catch (error) {
        let title = "Unexpected error";
        let msg = "Oops, something went wrong while updating the fee. Please try again.";
        openNotification("error", title, msg);
        console.log(error);
      }
      setEthAmount();
    }
  };

  const setL3PFee = async () => {
    if (L3PAmount && L3PAmount >= 0) {
      const tokenAmount = (L3PAmount * "1e18").toString();
      const sendOptions = {
        contractAddress: contractAddress,
        functionName: "setFeeL3P",
        abi: ABI.abi,
        params: {
          _newL3PFee: tokenAmount
        }
      };

      try {
        await Moralis.executeFunction(sendOptions);
        let title = "All set!";
        let msg = "L3P fee set successfully.";
        openNotification("success", title, msg);
      } catch (error) {
        let title = "Unexpected error";
        let msg = "Oops, something went wrong while updating the fee. Please try again.";
        openNotification("error", title, msg);
        console.log(error);
      }
      setL3PAmount();
    }
  };

  const setReceiverAddress = async () => {
    if (address) {
      const sendOptions = {
        contractAddress: contractAddress,
        functionName: "setFeeReceiver",
        abi: ABI.abi,
        params: {
          _newFeeReceiver: address.toString()
        }
      };

      try {
        await Moralis.executeFunction(sendOptions);
        let title = "All set!";
        let msg = "New receiver address set successfully.";
        openNotification("success", title, msg);
      } catch (error) {
        let title = "Unexpected error";
        let msg = "Oops, something went wrong while updating the receiver address. Please try again.";
        openNotification("error", title, msg);
        console.log(error);
      }
      setAddress(null);
    }
  };

  const setMetadata = async () => {
    if (IPFSurl && IPFSurl.length > 0) {
      const sendOptions = {
        contractAddress: contractAddress,
        functionName: "setTokenURI",
        abi: ABI.abi,
        params: {
          _newTokenURI: IPFSurl.toString()
        }
      };

      try {
        await Moralis.executeFunction(sendOptions);
        let title = "All set!";
        let msg = "New metadata set successfully.";
        openNotification("success", title, msg);
      } catch (error) {
        let title = "Unexpected error";
        let msg = "Oops, something went wrong while updating the metadata. Please try again.";
        openNotification("error", title, msg);
        console.log(error);
      }
    }
    setIPFSurl("");
  };

  const setNewAdmin = async () => {
    if (adminAddress) {
      const sendOptions = {
        contractAddress: contractAddress,
        functionName: "transferOwnership",
        abi: ABI.abi,
        params: {
          newOwner: adminAddress.toString()
        }
      };

      try {
        await Moralis.executeFunction(sendOptions);
        let title = "All set!";
        let msg = "New admin set successfully.";
        openNotification("success", title, msg);
      } catch (error) {
        let title = "Unexpected error";
        let msg = "Oops, something went wrong while changing the admin address. Please try again.";
        openNotification("error", title, msg);
        console.log(error);
      }
      setAdminAddress(null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Admin Panel</div>
      <div style={{ width: "60%", margin: "auto", marginBottom: "20px" }}>
        <Input type='number' style={{ marginBottom: "5px" }} onChange={(e) => setEthAmount(e.target.value)} />
        <Button type='primary' onClick={setEthFee}>
          Set ETH fee
        </Button>
      </div>
      <div style={{ width: "60%", margin: "auto", marginBottom: "20px" }}>
        <Input type='number' style={{ marginBottom: "5px" }} onChange={(e) => setL3PAmount(e.target.value)} />
        <Button type='primary' onClick={setL3PFee}>
          Set L3P fee
        </Button>
      </div>
      <div style={{ width: "60%", margin: "auto", marginBottom: "20px" }}>
        <AddressInput style={{ marginBottom: "5px" }} autoFocus placeholder='Receiver' onChange={setAddress} />
        <Button type='primary' onClick={setReceiverAddress}>
          Set receiver address
        </Button>
      </div>
      <div style={{ width: "60%", margin: "auto", marginBottom: "20px" }}>
        <Input style={{ marginBottom: "5px" }} onChange={setIPFSurl} />
        <Button type='primary' onClick={setMetadata}>
          Set Metadata
        </Button>
      </div>
      <div style={{ width: "60%", margin: "auto", marginBottom: "20px" }}>
        <AddressInput style={{ marginBottom: "5px" }} autoFocus placeholder='Receiver' onChange={setAdminAddress} />
        <Button type='primary' onClick={setNewAdmin}>
          Set admin address
        </Button>
      </div>
      <div>
        <Button style={styles.adminButton} shape='round' onClick={handleBackClic}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default AdminPane;
