import { FC, useEffect, useState } from "react";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Button, MenuProps } from "antd";

import styles from "./ChainSelector.module.css";
import { ETHLogo, BSCLogo, PolygonLogo } from "./Logos";
import { useUserData } from "../../../context/UserContextProvider";
import { isProdEnv } from "../../../data/constant";

const IconToShow = (element: JSX.Element) => {
    return <div className={styles.iconeToShow}>{element}</div>;
};

const items: MenuProps["items"] = isProdEnv
    ? [
          { label: "Ethereum", key: "0x1", icon: IconToShow(<ETHLogo />) },
          { label: "BNB Chain", key: "0x38", icon: IconToShow(<BSCLogo />) },
          { label: "Polygon", key: "0x89", icon: IconToShow(<PolygonLogo />) },
      ]
    : [
          { label: "Goerli Testnet", key: "0x5", icon: IconToShow(<ETHLogo />) },
          { label: "BNB Testnet", key: "0x61", icon: IconToShow(<BSCLogo />) },
          { label: "Mumbai", key: "0x13881", icon: IconToShow(<PolygonLogo />) },
      ];

type MenuItem = Required<MenuProps>["items"][number];

const ChainSelector: FC = () => {
    const { chainId, isConnected } = useUserData();
    const [selected, setSelected] = useState<MenuItem>();
    const [label, setLabel] = useState<JSX.Element>();

    useEffect(() => {
        if (!chainId) return;

        if (chainId === 1 || chainId === 5) {
            setLabel(ETHLogo);
        } else if (chainId === 137 || chainId === 80001) {
            setLabel(PolygonLogo);
        } else setLabel(BSCLogo);
        return;
    }, [chainId]);

    useEffect(() => {
        if (!chainId) return;
        setSelected(items.find((item) => Number(item?.key) === chainId));
        return;
    }, [chainId]);

    const onClick: MenuProps["onClick"] = async ({ key }) => {
        try {
            if (window.ethereum) {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: key }],
                });
                window.location.reload();
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (!chainId || !isConnected) return null;

    return (
        <Dropdown menu={{ items, onClick }}>
            <Button className={styles.button}>
                {!selected ? (
                    <span className={styles.selectorTitle}>Select Chain</span>
                ) : (
                    <div className={styles.chainItem}>
                        <span className={styles.chainLogo}>{label}</span>
                        {/* @ts-expect-error title is a valid object*/}
                        <span className={styles.chainName}>{selected?.label}</span>
                    </div>
                )}

                <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default ChainSelector;
