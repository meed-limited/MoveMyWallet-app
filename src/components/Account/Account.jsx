import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "../Address/Blockie";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./config";

const styles = {
  account: {
    height: "46px",
    padding: "0 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "23px",
    color: "white",
    backgroundColor: "#111",
    cursor: "pointer",
    fontWeight: "600",
    gap: "7px"
  },
  button: {
    height: "46px",
    padding: "0 30px",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: "0.5px",
    fontSize: "16px",
    margin: "20px 20px",
    border: "none",
    background: "black",
    color: "white",
    fontFamily: "Sora, sans-serif"
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer"
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px"
  }
};

function Account() {
  const { authenticate, isAuthenticated, account, chainId, logout } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  if (!isAuthenticated || !account) {
    return (
      <>
        <Button shape='round' type='primary' style={styles.button} onClick={() => setIsAuthModalVisible(true)}>
          Connect Wallet
        </Button>

        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500"
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width='340px'
        >
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "20px"
            }}
          >
            Connect Wallet
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                style={styles.connector}
                key={key}
                onClick={async () => {
                  try {
                    await authenticate({
                      provider: connectorId,
                      signingMessage: "Welcome to MoveMyWallet - By Lepricon"
                    });
                    window.localStorage.setItem("connectorId", connectorId);
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <Text style={{ fontSize: "14px" }}>{title}</Text>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div style={styles.account} onClick={() => setIsModalVisible(true)}>
        <p style={styles.text}>{getEllipsisTxt(account, 6)}</p>
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500"
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width='400px'
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem"
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address avatar='left' size={6} copyable style={{ fontSize: "20px" }} />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a href={`${getExplorer(chainId)}/address/${account}`} target='_blank' rel='noreferrer'>
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size='large'
          type='primary'
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500"
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
