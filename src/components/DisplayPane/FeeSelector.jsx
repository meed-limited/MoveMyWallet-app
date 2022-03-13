import { useEffect, useState } from "react";
import Moralis from "moralis";
import { useMoralis, useNativeBalance } from "react-moralis";
import { CHAINS_WITH_L3P_SUPPORT, ABI, getContractAddress } from "../../helpers/constant";
import { menuItems } from "../Chains/Chains";
import { Alert, Switch } from "antd";

const styles = {
  feeSelection: {
    color: "white",
    fontSize: "25px",
    textAlign: "center",
    margin: "10px",
    padding: "20px"
  }
};

const FeeSelector = ({ setServiceFee }) => {
  const { chainId, isWeb3Enabled, network } = useMoralis();
  const { nativeToken } = useNativeBalance(chainId);
  const contractAddress = getContractAddress(chainId);
  const [feeInETH, setFeeinETH] = useState();
  const [feeInL3P, setFeeinL3P] = useState();
  const onLP3Chain = CHAINS_WITH_L3P_SUPPORT.includes(chainId);

  const getFeeinETH = async () => {
    const readOptions = {
      contractAddress: contractAddress,
      functionName: "feeETH",
      abi: ABI.abi
    };

    try {
      let feeEth = await Moralis.executeFunction(readOptions);
      feeEth = parseFloat(feeEth) / "1e18";
      setFeeinETH(feeEth);
      setServiceFee({ type: "native", amount: feeEth }); //initialisation
    } catch (error) {
      console.log(error);
    }
  };

  const getFeeinL3P = async () => {
    const readOptions = {
      contractAddress: contractAddress,
      functionName: "feeL3P",
      abi: ABI.abi
    };

    try {
      let feeL3P = await Moralis.executeFunction(readOptions);
      feeL3P = parseInt(feeL3P);
      setFeeinL3P(feeL3P);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      getFeeinETH();
      getFeeinL3P();
    }
  }, [isWeb3Enabled]);

  const onSwitchChange = (checked) => {
    if (checked) {
      setServiceFee({ type: "L3P", amount: feeInL3P });
    } else {
      setServiceFee({ type: "native", amount: feeInETH });
    }
  };

  const chainName = menuItems.filter((name) => name.key === chainId)[0].value;

  return (
    <>
      <div style={{ width: "90%", textAlign: "center", margin: "30px auto 0 auto" }}>
        <label style={{ fontWeight: 600, fontSize: "20px" }}>Service fees payment options:</label>
      </div>
      <div style={styles.feeSelection}>
        {feeInETH} {nativeToken?.symbol}
        <Switch
          onChange={onSwitchChange}
          disabled={!onLP3Chain}
          style={{ margin: "0 15px", padding: "0 10px" }}
        ></Switch>
        {feeInL3P} L3P
      </div>
      {!onLP3Chain && (
        <Alert
          type='info'
          closable={true}
          showIcon
          message={`L3P payment is not available on ${chainName} yet.`}
        />
      )}
    </>
  );
};

export default FeeSelector;
