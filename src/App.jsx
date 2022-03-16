import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useMoralis } from "react-moralis";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import WalletMover from "./components/WalletMover";
import { Button, Layout } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import MMW_Logo from "./assets/MMW_Logo.png";
import appBackground from "./assets/app-background.jpg";
import beta from "./assets/beta.png";
const { Header } = Layout;

const styles = {
  layout: {
    height: "100vh",
    background: `url(${appBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Sora, sans-serif",
    color: "#041836",
    marginTop: "90px",
    padding: "10px"
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Sora, sans-serif",
    padding: "15px 35px 0 0"
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600"
  },
  adminButton: {
    height: "40px",
    padding: "0 20px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "15px",
    margin: "20px 20px",
    border: "none",
    background: "black",
    color: "white",
    fontFamily: "Sora, sans-serif"
  }
};
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, account } = useMoralis();
  const [isAdminPaneOpen, setIsAdminPaneOpen] = useState(false);
  const [adminAddress, setAdminAddress] = useState();
  const isAdmin = account?.toLowerCase() === adminAddress?.toLowerCase() ? true : false;

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const openAdminPane = () => {
    if (!isAdminPaneOpen) {
      setIsAdminPaneOpen(true);
    }
  };

  return (
    <Layout style={styles.layout}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <div style={styles.headerRight}>
            {isAdmin && isAuthenticated && (
              <div>
                <Button style={styles.adminButton} shape='round' onClick={openAdminPane}>
                  Admin Panel
                </Button>
              </div>
            )}
            <Chains />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <WalletMover
            setAdminAddress={setAdminAddress}
            isAdminPaneOpen={isAdminPaneOpen}
            setIsAdminPaneOpen={setIsAdminPaneOpen}
          />
        </div>
      </Router>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex", alignSelf: "center" }}>
    <div style={{ paddingTop: "8px", width: "100px", height: "100px" }}>
      <img src={beta} alt='beta' />
    </div>
    <div style={{ paddingTop: "27px", width: "375px", height: "75px" }}>
      <img src={MMW_Logo} alt='logo' />
    </div>
  </div>
);

export default App;
