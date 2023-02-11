import { FC } from "react";

import { Modal, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Connector, useConnect } from "wagmi";

import IMAGES from "./walletIcons";
import styles from "../ConnectButton.module.css";

const ConnectModal: FC<ConnectModalProps> = ({ isOpen, setIsOpen }) => {
    const { connect, connectors, isLoading, pendingConnector } = useConnect();

    const getConnectorImage = (connector: Connector) => {
        const data = IMAGES.filter((item) => item.name.toLowerCase() === connector.name.toLowerCase());
        return data[0]?.image.src;
    };

    return (
        <Modal
            open={isOpen}
            footer={null}
            onCancel={() => setIsOpen(false)}
            wrapClassName="modalStyle"
            bodyStyle={{
                minWidth: "280px",
                maxWidth: "280px",
                margin: "auto",
                padding: "15px 10px",
                fontSize: "17px",
                fontWeight: "500",
            }}
            width="330px"
        >
            <div className="modal_title">Connect Your Wallet</div>

            <div style={{ display: "flex", flexDirection: "column" }}>
                {connectors.map((connector) => (
                    <Button
                        className={styles.connectorButton}
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => {
                            setIsOpen(false);
                            connect({ connector });
                        }}
                    >
                        <span className={styles.connectButtonText}>{connector.name}</span>
                        {!connector.ready && " (unsupported)"}
                        {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
                        <Image src={getConnectorImage(connector)} width={32} height={32} alt={connector.name} />
                    </Button>
                ))}
            </div>

            <div className={styles.connectModalBottom}>
                Need help installing a wallet?{" "}
                <Link
                    href="https://metamask.zendesk.com/hc/en-us/articles/360015489471-How-to-Install-MetaMask-Manually"
                    target="_blank"
                    rel="noopener"
                >
                    <b>Click here</b>
                </Link>
            </div>

            <div className={styles.connectModalBottomText}>
                Wallets are provided by External Providers and by selecting you agree to Terms of those Providers. Your
                access to the wallet might be reliant on the External Provider being operational.
            </div>
        </Modal>
    );
};

export default ConnectModal;
