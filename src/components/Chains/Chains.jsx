import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { PolygonLogo, BSCLogo, ETHLogo } from "./Logos";
import { useChain, useMoralis } from "react-moralis";

const styles = {
  item: {
    borderRadius: "8px",
    fontFamily: "Sora, sans-serif"
  },
  button: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    border: "2px solid rgb(231, 234, 243)"
  }
};

export const menuItems = [
  {
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />,
    label: "Ethereum"
  },
  // {
  //   key: "0x539",
  //   value: "Local Chain",
  //   icon: <ETHLogo />
  // },
  // {
  //   key: "0x3",
  //   value: "Ropsten Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x4",
  //   value: "Rinkeby Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x2a",
  //   value: "Kovan Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x5",
  //   value: "Goerli Testnet",
  //   icon: <ETHLogo />,
  // },
  {
    key: "0x38",
    value: "Binance",
    icon: <BSCLogo />,
    label: "Binance"
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    icon: <BSCLogo />,
    label: "Smart Chain Testnet"
  },
  {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
    label: "Polygon"
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
    label: "Mumbai"
  }
  // {
  //   key: "0xa86a",
  //   value: "Avalanche",
  //   icon: <AvaxLogo />,
  // },
  // {
  //   key: "0xa869",
  //   value: "Avalanche Testnet",
  //   icon: <AvaxLogo />,
  // },
];

function Chains() {
  const { switchNetwork, chainId } = useChain();
  const { isAuthenticated } = useMoralis();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
    console.log("current chainId: ", chainId);
  }, [chainId]);

  const handleMenuClick = (e) => {
    console.log("switch to: ", e.key);
    switchNetwork(e.key);
  };

  const menu = <Menu onClick={handleMenuClick} items={menuItems} style={styles.item} />;

  if (!chainId || !isAuthenticated) return null;

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button key={selected?.key} icon={selected?.icon} style={{ ...styles.button, ...styles.item }}>
          {!selected && <span style={{ marginLeft: "5px" }}>Select Chain</span>}
          {selected && <span style={{ marginLeft: "5px" }}>{selected?.value}</span>}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default Chains;
