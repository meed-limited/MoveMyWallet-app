import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { menuItems } from "./Chains";

const styles = {
  container: {
    background:
      "linear-gradient(315deg, rgb(69, 75, 205) 0%, rgba(159, 161, 198, 0.4) 50%, rgba(223, 223, 228, 0.3) 100%)",
    borderRadius: "20px",
    width: "90%",
    height: "100%",
    textAlign: "center",
    margin: "auto",
    padding: "10px 0"
  },
  smallContainer: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    flexDirection: "column"
  },
  text: {
    color: "black",
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "1px",
    padding: "60px"
  }
};

const ChainVerification = ({ setIsSupportedChain }) => {
  const { chainId, isAuthenticated } = useMoralis();
  const onSupportedChain = menuItems?.filter((item) => item.key === chainId).length > 0;

  useEffect(() => {
    if (chainId && isAuthenticated) {
      setIsSupportedChain(onSupportedChain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, isAuthenticated, onSupportedChain]);

  return (
    <>
      {isAuthenticated && !onSupportedChain && (
        <div style={styles.container}>
          <div style={styles.smallContainer}>
            <p style={styles.text}>
              This chain is not supported,<br></br>
              please select a different chain
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChainVerification;
