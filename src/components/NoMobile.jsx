const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "auto"
  },
  smallContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    background:
      "linear-gradient(315deg, rgb(69, 75, 205) 0%, rgba(159, 161, 198, 0.4) 50%, rgba(223, 223, 228, 0.3) 100%)",
    borderRadius: "20px",
    border: "solid black 1px",
    padding: "15px"
  },
  text: {
    color: "black",
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "1px",
    padding: "60px"
  }
};

const NoMobile = () => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.smallContainer}>
          <p style={styles.text}>
            Sorry, this dapp is not available on mobile version just yet.<br></br>
            <br></br>
            Give us a bit more time!
          </p>
        </div>
      </div>
    </>
  );
};

export default NoMobile;
