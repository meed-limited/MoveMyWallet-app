import { useMoralis } from "react-moralis";

const styles = {
  container: {
    background:
      "linear-gradient(315deg, rgb(69, 75, 205) 0%, rgba(159, 161, 198, 0.4) 50%, rgba(223, 223, 228, 0.3) 100%)",
    borderRadius: "20px",
    width: "90%",
    height: "100%",
    textAlign: "center",
    margin: "auto",
    padding: "50px 0"
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
    letterSpacing: "1px"
  }
};

const AccountVerification = () => {
  const { isAuthenticated } = useMoralis();

  const message = "Connect your wallet";

  return (
    <>
      {!isAuthenticated && (
        <div style={styles.container}>
          <div style={styles.smallContainer}>
            <div style={styles.text}>{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountVerification;
