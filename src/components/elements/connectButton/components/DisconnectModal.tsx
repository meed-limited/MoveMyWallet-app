import { FC } from "react";

import { SelectOutlined } from "@ant-design/icons";
import { Modal, Card, Button } from "antd";
import { useDisconnect } from "wagmi";

import Address from "./Address";
import { useUserData } from "../../../../context/UserContextProvider";
import { getExplorer } from "../../../../utils/getExplorerByChain";
import styles from "../ConnectButton.module.css";

const DisconnectModal: FC<DisconnectModalProps> = ({ isOpen, onClose }) => {
    const { address, chainId } = useUserData();
    const { disconnect } = useDisconnect();

    const disconnectWallet = async () => {
        disconnect();
        localStorage.removeItem("connectorId");
        onClose(false);
    };

    return (
        <Modal
            open={isOpen}
            footer={null}
            onCancel={() => onClose(false)}
            wrapClassName="modalStyle"
            bodyStyle={{
                width: "350px",
                fontSize: "17px",
                fontWeight: "500",
            }}
            style={{ display: "flex", justifyContent: "center" }}
        >
            <div className="modal_title">Account</div>
            <Card
                style={{
                    marginTop: "10px",
                    borderRadius: "1rem",
                }}
                bodyStyle={{ padding: "15px" }}
            >
                <Address account={address as string} avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
                <div style={{ marginTop: "10px", padding: "0 10px", fontSize: "17px" }}>
                    <a href={`${getExplorer(chainId)}/address/${address}`} target="_blank" rel="noreferrer">
                        <SelectOutlined style={{ marginRight: "5px" }} />
                        View on Explorer
                    </a>
                </div>
            </Card>
            <Button size="large" type="primary" className={styles.disconnectButton} onClick={() => disconnectWallet()}>
                Disconnect Wallet
            </Button>
        </Modal>
    );
};

export default DisconnectModal;
