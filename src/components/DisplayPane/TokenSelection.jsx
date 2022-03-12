/*eslint no-dupe-keys: "Off"*/
import { useEffect, useState } from "react";
import { useERC20Balances, useMoralis } from "react-moralis";
import { Transfer, Alert, Button } from "antd";

const styles = {
  tokenSelection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "auto",
    padding: "30px",
    alignItems: "center",
    height: "100%"
  },
  text: {
    color: "#eee",
    fontFamily: "Sora, sans-serif",
    fontWeight: "600",
    letterSpacing: "1px",
    fontSize: "25px",
    margin: "20px auto"
  },
  tokenInputLine: {
    height: "30px",
    background: "#eee",
    background: "linear-gradient(315deg, rgba(69,75,205,0.8) 0%, rgba(69,75,205,0.25) 50%, rgba(69,75,205,0.8) 100%)",
    color: "white",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 10px",
    alignItems: "center",
    fontFamily: "Sora, sans-serif",
    maxWidth: "100%"
  },
  transfer: {
    margin: "auto",
    width: "100%",
    padding: "20px"
  },
  transferList: {
    width: "50%",
    height: "300px",
    background:
      "linear-gradient(to right, rgba(240, 248, 255, 0.4) 0%, rgba(240, 248, 255, 0.25) 50%, rgba(240, 248, 255, 0.1) 90%)",
    borderRadius: "20px"
  },
  buttonDiv: {
    margin: "15px 30px 15px 0",
    textAlign: "right",
    width: "100%"
  },
  button: {
    margin: "0 5px",
    texAlign: "center",
    padding: "5px 40px",
    background: "black",
    border: 0,
    color: "white",
    fontWeight: 600
  }
};

function TokenSelection({ tokensToTransfer, setTokensToTransfer, onFinishSelection }) {
  const { chainId } = useMoralis();
  const { fetchERC20Balances, data, error } = useERC20Balances({ params: { chain: chainId } });
  const [allERC20tokens, setAllERC20tokens] = useState([]);
  const [selectedTokensKeys, setSelectedTokenKeys] = useState([]);

  useEffect(() => {
    fetchERC20Balances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      prepareTransferData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const prepareTransferData = () => {
    setAllERC20tokens(data.map((item) => ({ ...item, key: item.symbol })));
    if (tokensToTransfer) {
      setSelectedTokenKeys(tokensToTransfer?.map((token) => token.key));
    }
  };

  const handleTransferChange = (keys, direction, moveKeys) => {
    setSelectedTokenKeys(keys);
  };

  const renderItem = (item) => {
    const tokenLine = (
      <div style={styles.tokenInputLine}>
        <p>{item?.balance / ("1e" + item?.decimals)}</p>
        <p>{item?.symbol}</p>
      </div>
    );

    return {
      label: tokenLine, // for displayed item
      value: item.title // for title and filter matching
    };
  };

  const onValidateTokensToTransfer = () => {
    setTokensToTransfer(allERC20tokens.filter((token) => selectedTokensKeys.includes(token.key)));
    onFinishSelection();
  };

  const selectButtonText = selectedTokensKeys.length >= allERC20tokens.length ? "Deselect All" : "Select All";

  const onSelectAllTokens = () => {
    if (selectedTokensKeys.length < allERC20tokens.length) {
      setSelectedTokenKeys(allERC20tokens.map((token) => token.key));
    } else {
      setSelectedTokenKeys([]);
    }
  };

  return (
    <div style={styles.tokenSelection}>
      <div style={styles.text}>
        <p>Select Tokens to transfer</p>
      </div>
      {error && <Alert style={{ margin: "20px" }} message={"Unable to fetch user tokens"} type='error' showIcon />}
      <div style={styles.transfer}>
        <Transfer
          dataSource={allERC20tokens}
          listStyle={styles.transferList}
          targetKeys={selectedTokensKeys}
          onChange={handleTransferChange}
          render={renderItem}
          oneWay
          header={undefined}
          titles={["remaining", "to transfer"]}
        />
      </div>
      <div style={styles.buttonDiv}>
        <Button style={styles.button} shape='round' onClick={onSelectAllTokens}>
          {selectButtonText}
        </Button>
        <Button style={styles.button} shape='round' onClick={onValidateTokensToTransfer}>
          OK
        </Button>
      </div>
    </div>
  );
}

export default TokenSelection;
