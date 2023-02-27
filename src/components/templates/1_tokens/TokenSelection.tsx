import { FC, useEffect, useState } from "react";

import { Transfer, Button } from "antd";
import type { TransferDirection } from "antd/es/transfer";

import styles from "./TokenSelection.module.css";
import { useUserData } from "../../../context/UserContextProvider";

type RenderItem = (item: { balance: number; decimals: number; symbol: string; title: string }) => {
    label: JSX.Element;
    value: string;
};

const antdStyles = {
    transferList: {
        width: "100%",
        height: "300px",
        background:
            "linear-gradient(to right, rgba(240, 248, 255, 0.4) 0%, rgba(240, 248, 255, 0.25) 50%, rgba(240, 248, 255, 0.1) 90%)",
        borderRadius: "20px",
    },
} as const;

const TokenSelection: FC<TokenProps> = ({ tokensToTransfer, setTokensToTransfer }) => {
    const { balances, setDisplayPaneMode } = useUserData();
    const [selectedTokensKeys, setSelectedTokenKeys] = useState<string[]>([]);

    const ERC20tokens = balances?.token?.map((item) => ({
        ...item,
        balance: Number(item.balance),
        key: item.symbol,
        title: item.name,
    }));

    useEffect(() => {
        if (balances?.token) {
            prepareTransferData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [balances?.token]);

    const prepareTransferData = () => {
        if (tokensToTransfer) {
            setSelectedTokenKeys(tokensToTransfer?.map((token) => token.key));
        }
    };

    const handleTransferChange = (keys: string[], _direction: TransferDirection, _moveKeys: string[]) => {
        setSelectedTokenKeys(keys);
    };

    const renderItem: RenderItem = (item) => {
        const decimals = item.decimals;
        const tokenLine = (
            <div className={styles.tokenInputLine}>
                <p>{item.balance / 10 ** decimals}</p>
                <p>{item.symbol}</p>
            </div>
        );

        return {
            label: tokenLine, // for displayed item
            value: item.title, // for title and filter matching
        };
    };

    const onValidateTokensToTransfer = () => {
        setTokensToTransfer(ERC20tokens.filter((token) => selectedTokensKeys.includes(token.key)));
        setDisplayPaneMode("nfts");
    };

    const selectButtonText = selectedTokensKeys.length >= ERC20tokens?.length ? "Deselect All" : "Select All";

    const onSelectAllTokens = () => {
        if (selectedTokensKeys.length < ERC20tokens?.length) {
            setSelectedTokenKeys(ERC20tokens.map((token) => token.key));
        } else {
            setSelectedTokenKeys([]);
        }
    };

    return (
        <div className="pane-content">
            <p className={styles.text}>Select Tokens to transfer</p>

            <div className={styles.transfer}>
                <Transfer
                    dataSource={ERC20tokens}
                    listStyle={antdStyles.transferList}
                    targetKeys={selectedTokensKeys}
                    onChange={handleTransferChange}
                    render={renderItem}
                    oneWay
                    titles={["Current Wallet", "To transfer"]}
                />
            </div>
            <div className="button-align-right">
                <Button className="button-small black" shape="round" onClick={onSelectAllTokens}>
                    {selectButtonText}
                </Button>
                <Button className="button-small black" shape="round" onClick={onValidateTokensToTransfer}>
                    OK
                </Button>
            </div>
        </div>
    );
};

export default TokenSelection;
