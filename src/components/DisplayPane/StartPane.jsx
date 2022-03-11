import { Button } from "antd";

const styles = {
  startPane: {
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
    fontSize: "35px",
    margin: "20px auto"
  },
  buttonDiv: {
    margin: "20px 0",
    textAlign: "center",
    width: "100%"
  },
  button: {
    padding: "5px 80px",
    height: "50px",
    background: "black",
    border: 0,
    color: "white",
    fontSize: "25px",
    fontWeight: 600,
    margin: "0 20px"
  }
};

const StartPane = ({ onStart }) => {
  return (
    <div style={styles.startPane}>
      <div style={styles.text}>
        <p>
          Welcome to<br></br> <span style={{ fontSize: "60px" }}>Move My Wallet</span>
        </p>
      </div>
      <div style={styles.buttonDiv}>
        <Button style={styles.button} shape='round' onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default StartPane;
